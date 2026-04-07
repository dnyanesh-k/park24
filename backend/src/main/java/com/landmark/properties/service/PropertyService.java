package com.landmark.properties.service;

import com.landmark.properties.dto.PropertyRequestDTO;
import com.landmark.properties.dto.PropertyResponseDTO;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface PropertyService {

    PropertyResponseDTO createProperty(PropertyRequestDTO requestDTO,  List<MultipartFile> images);

    List<PropertyResponseDTO> getAllProperties();

    PropertyResponseDTO getPropertyById(Long id);

    void deleteProperty(Long id);
    
    public List<PropertyResponseDTO> getPropertiesByCurrentUser();
}