package com.park24.user.mapper;

import org.mapstruct.Builder;
import org.mapstruct.Mapper;

import com.park24.user.dto.UserRegistrationDTO;
import com.park24.user.dto.UserResponseDTO;
import com.park24.user.entity.User;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = true))
public interface UserMapper {
    // If field names are identical, MapStruct maps them automatically.
    // If you need to map 'password' from DTO to 'passwordHash' in Entity:
    // @Mapping(target = "passwordHash", source = "password")
    User toEntity(UserRegistrationDTO dto);

    UserResponseDTO toDTO(User user);

}
