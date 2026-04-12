package com.park24.auth.dto;

import com.park24.user.dto.UserResponseDTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponseDTO {
    private String token;
    private UserResponseDTO user;
}		