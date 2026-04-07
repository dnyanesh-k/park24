package com.landmark.user.mapper;

import org.mapstruct.Builder;
import org.mapstruct.Mapper;

import com.landmark.user.dto.UserRegistrationDTO;
import com.landmark.user.dto.UserResponseDTO;
import com.landmark.user.entity.User;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = true))
public interface UserMapper {
    // If field names are identical, MapStruct maps them automatically.
    // If you need to map 'password' from DTO to 'passwordHash' in Entity:
    // @Mapping(target = "passwordHash", source = "password")
    User toEntity(UserRegistrationDTO dto);

    UserResponseDTO toDTO(User user);

}
