package com.landmark.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.landmark.shared.dto.ApiResponseDTO;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice(basePackages = "com.landmark.user")
public class UserExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ApiResponseDTO<Void>> handleUserExists(UserAlreadyExistsException ex,
            HttpServletRequest request) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(ApiResponseDTO.error(request.getRequestURI(), ex.getMessage(), HttpStatus.CONFLICT.value()));
    }

}
