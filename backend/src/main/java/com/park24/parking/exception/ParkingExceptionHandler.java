package com.park24.parking.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.park24.shared.dto.ApiResponseDTO;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice(basePackages = "com.park24.parking")
public class ParkingExceptionHandler {

    @ExceptionHandler(ParkingException.class)
    public ResponseEntity<ApiResponseDTO<?>> handleParkingException(
            ParkingException ex,
            HttpServletRequest request) {

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponseDTO.error(
                        request.getRequestURI(),
                        ex.getMessage(),
                        HttpStatus.BAD_REQUEST.value()
                ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponseDTO<?>> handleGenericException(
            Exception ex,
            HttpServletRequest request) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponseDTO.error(
                        request.getRequestURI(),
                        "Something went wrong",
                        HttpStatus.INTERNAL_SERVER_ERROR.value()
                ));
    }
}