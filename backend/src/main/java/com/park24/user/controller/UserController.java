package com.park24.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.park24.shared.dto.ApiResponseDTO;
import com.park24.user.dto.UserRegistrationDTO;
import com.park24.user.dto.UserResponseDTO;
import com.park24.user.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@CrossOrigin(value = "*")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ApiResponseDTO<?> registerUser(@Valid @RequestBody UserRegistrationDTO user) {
    	System.out.println("REGISTER USER : "+user.toString());
        UserResponseDTO registeredUser = userService.registerUser(user);
        return ApiResponseDTO.ok(
                registeredUser,
                "User registered successfully!",
                HttpStatus.CREATED.value());
    }
}
