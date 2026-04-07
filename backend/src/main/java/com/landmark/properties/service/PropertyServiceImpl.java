package com.landmark.properties.service;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.landmark.properties.dto.PropertyRequestDTO;
import com.landmark.properties.dto.PropertyResponseDTO;
import com.landmark.properties.entity.Property;
import com.landmark.properties.entity.PropertyImage;
import com.landmark.properties.exception.PropertyNotFoundException;
import com.landmark.properties.exception.ResourceNotFoundException;
import com.landmark.properties.mapper.PropertyMapper;
import com.landmark.properties.exception.InvalidSellerException;
import com.landmark.properties.repository.PropertyRepository;
import com.landmark.shared.config.S3StorageService;
import com.landmark.user.entity.User;
import com.landmark.user.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final PropertyMapper propertyMapper;
    private final S3StorageService s3StorageService; 

    @Override
    @Transactional
    public PropertyResponseDTO createProperty(
            PropertyRequestDTO requestDTO,
            List<MultipartFile> images) {

        if (images == null || images.size() != 3) {
            throw new RuntimeException("Exactly 3 images are required.");
        }

        User seller = userRepository.findById(requestDTO.getSellerId())
                .orElseThrow(() ->
                        new InvalidSellerException(
                                "Seller not found with id " + requestDTO.getSellerId()));

        Property property = propertyMapper.toEntity(requestDTO);
        property.setSeller(seller);

        // Save property first (so we get ID)
        Property savedProperty = propertyRepository.save(property);

        // Upload images and attach to property
        for (MultipartFile file : images) {

            String imageUrl = s3StorageService.uploadFile(
                    file,
                    "properties/" + savedProperty.getId()
            );

            PropertyImage propertyImage = PropertyImage.builder()
                    .imageUrl(imageUrl)
                    .property(savedProperty)
                    .build();

            savedProperty.getImages().add(propertyImage);
        }

        // Save again to persist images (cascade handles it)
        Property finalSaved = propertyRepository.save(savedProperty);

        return propertyMapper.toDTO(finalSaved);
    }

    @Override
    public List<PropertyResponseDTO> getAllProperties() {
        return propertyRepository.findAll()
                .stream()
                .map(propertyMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PropertyResponseDTO getPropertyById(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() ->
                        new PropertyNotFoundException("Property not found with id " + id));

        return propertyMapper.toDTO(property);
    }

    @Override
    @Transactional
    public void deleteProperty(Long id) {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() ->
                        new PropertyNotFoundException("Property not found with id " + id));

        propertyRepository.delete(property);
    }

    
    @Override
    public List<PropertyResponseDTO> getPropertiesByCurrentUser() {
        // 1. Get the current logged-in user's identifier (username/phone) from JWT
        String currentUserPhone = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication().getName();

        // 2. Find the user in DB
        User seller = userRepository.findByPhoneNumber(currentUserPhone)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // 3. Fetch properties belonging to this seller
        List<Property> properties = propertyRepository.findBySeller(seller);

        // 4. Map to DTOs
        return properties.stream()
                .map(propertyMapper::toDTO)
                .toList();
    }

}