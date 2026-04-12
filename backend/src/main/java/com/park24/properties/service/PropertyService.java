package com.park24.properties.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.park24.properties.dto.PropertyRequestDTO;
import com.park24.properties.dto.PropertyResponseDTO;

public interface PropertyService {

    PropertyResponseDTO createProperty(PropertyRequestDTO requestDTO,  List<MultipartFile> images);

    List<PropertyResponseDTO> getAllProperties();

    PropertyResponseDTO getPropertyById(Long id);

    void deleteProperty(Long id);
    
    public List<PropertyResponseDTO> getPropertiesByCurrentUser();
}