package com.landmark.auth.dto;

import com.landmark.user.dto.UserResponseDTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponseDTO {
    private String token;
    private UserResponseDTO user;
}		