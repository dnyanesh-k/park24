package com.landmark.properties.mapper;

import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.landmark.properties.dto.PropertyRequestDTO;
import com.landmark.properties.dto.PropertyResponseDTO;
import com.landmark.properties.entity.Property;
import com.landmark.properties.entity.PropertyImage;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = true))
public interface PropertyMapper {

     Property toEntity(PropertyRequestDTO propertyRequestDTO);
     
     @Mapping(target = "imageUrls", source = "images")
     PropertyResponseDTO toDTO(Property property);
     
     default String map(PropertyImage image) {
         return image.getImageUrl();
     }
}
