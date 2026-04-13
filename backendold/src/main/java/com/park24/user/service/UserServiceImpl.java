package com.park24.user.service;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.park24.user.dto.UserRegistrationDTO;
import com.park24.user.dto.UserResponseDTO;
import com.park24.user.entity.User;
import com.park24.user.exception.UserAlreadyExistsException;
import com.park24.user.mapper.UserMapper;
import com.park24.user.repository.UserRepository;

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
