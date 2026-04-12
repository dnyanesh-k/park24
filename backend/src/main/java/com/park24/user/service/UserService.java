package com.park24.user.service;

import com.park24.user.dto.UserRegistrationDTO;
import com.park24.user.dto.UserResponseDTO;

public interface UserService {
       public UserResponseDTO registerUser(UserRegistrationDTO userDTO);
}
