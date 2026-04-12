package com.park24.properties.mapper;

import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.park24.properties.dto.PropertyRequestDTO;
import com.park24.properties.dto.PropertyResponseDTO;
import com.park24.properties.entity.Property;
import com.park24.properties.entity.PropertyImage;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = true))
public interface PropertyMapper {

     Property toEntity(PropertyRequestDTO propertyRequestDTO);
     
     @Mapping(target = "imageUrls", source = "images")
     PropertyResponseDTO toDTO(Property property);
     
     default String map(PropertyImage image) {
         return image.getImageUrl();
     }
}
