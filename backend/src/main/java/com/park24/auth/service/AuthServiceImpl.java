package com.park24.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.park24.auth.dto.AuthResponseDTO;
import com.park24.auth.dto.UserLoginDTO;
import com.park24.auth.exception.UserDoesNotExist;
import com.park24.auth.repository.AuthRepository;
import com.park24.security.JwtService;
import com.park24.user.entity.User;
import com.park24.user.mapper.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthRepository authRepository;

    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;
    
    private final JwtService jwtService;

    @Override
    @Transactional
    public AuthResponseDTO login(UserLoginDTO loginDTO) {

        User user = authRepository.findByPhoneNumber(loginDTO.getPhoneNumber())
                .orElseThrow(() -> new UserDoesNotExist(
                        "User does not exist with phone " + loginDTO.getPhoneNumber()));

        if (!passwordEncoder.matches(loginDTO.getPasswordHash(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getPhoneNumber());
        System.out.println("TOKEN "+token);

        return AuthResponseDTO.builder()
                .token(token)
                .user(userMapper.toDTO(user))
                .build();
    }

}
