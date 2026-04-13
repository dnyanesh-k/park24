package com.park24.auth.service;

import com.park24.auth.dto.AuthResponseDTO;
import com.park24.auth.dto.UserLoginDTO;
import com.park24.user.dto.UserResponseDTO;

public interface AuthService {
    AuthResponseDTO login(UserLoginDTO loginDTO);
}
