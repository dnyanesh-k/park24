package com.landmark.user.service;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.landmark.user.dto.UserRegistrationDTO;
import com.landmark.user.dto.UserResponseDTO;
import com.landmark.user.entity.User;
import com.landmark.user.exception.UserAlreadyExistsException;
import com.landmark.user.mapper.UserMapper;
import com.landmark.user.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper; // Mapstruct mapper injection
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserResponseDTO registerUser(UserRegistrationDTO userDTO) {

        if (userRepository.existsByPhoneNumber(userDTO.getPhoneNumber())) {
            throw new UserAlreadyExistsException("User with phone number " + userDTO.getPhoneNumber() + " already exists!");
        }
        User user = userMapper.toEntity(userDTO);
        user.setPasswordHash(passwordEncoder.encode(userDTO.getPasswordHash()));
        User registeredUser = userRepository.save(user);
        System.out.println("RIGISTERED USER: "+registeredUser);
        return userMapper.toDTO(registeredUser);
    }

}
