package com.landmark.properties.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.landmark.shared.dto.ApiResponseDTO;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice(basePackages = "com.landmark.properties")
public class PropertyExceptionHandler {

    @ExceptionHandler(PropertyNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponseDTO<?> handlePropertyNotFound(PropertyNotFoundException ex, HttpServletRequest request) {
        return ApiResponseDTO.error(
                request.getRequestURI(),
                ex.getMessage(),
                HttpStatus.NOT_FOUND.value());
    }

    @ExceptionHandler(InvalidSellerException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponseDTO<?> handleInvalidSeller(InvalidSellerException ex, HttpServletRequest request) {
        return ApiResponseDTO.error(
                request.getRequestURI(),
                ex.getMessage(),
                HttpStatus.BAD_REQUEST.value());
    }
}