package com.landmark.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.landmark.auth.dto.AuthResponseDTO;
import com.landmark.auth.dto.UserLoginDTO;
import com.landmark.auth.service.AuthService;
import com.landmark.shared.dto.ApiResponseDTO;
import com.landmark.user.dto.UserResponseDTO;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(value = "*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ApiResponseDTO<?> login(@Valid @RequestBody UserLoginDTO loginDTO) {
        System.err.println("LOGGED IN USER" + loginDTO.toString());
        AuthResponseDTO user = authService.login(loginDTO);
        return ApiResponseDTO.ok(user, "User logged in successfully!", HttpStatus.ACCEPTED.value());
    }
}
