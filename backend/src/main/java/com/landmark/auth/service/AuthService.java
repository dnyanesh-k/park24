package com.landmark.auth.service;

import com.landmark.auth.dto.AuthResponseDTO;
import com.landmark.auth.dto.UserLoginDTO;
import com.landmark.user.dto.UserResponseDTO;

public interface AuthService {
    AuthResponseDTO login(UserLoginDTO loginDTO);
}
