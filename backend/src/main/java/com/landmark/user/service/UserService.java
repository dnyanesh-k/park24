package com.landmark.user.service;

import com.landmark.user.dto.UserRegistrationDTO;
import com.landmark.user.dto.UserResponseDTO;

public interface UserService {
       public UserResponseDTO registerUser(UserRegistrationDTO userDTO);
}
