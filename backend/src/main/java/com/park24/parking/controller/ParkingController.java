package com.park24.parking.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.park24.parking.service.ParkingLotService;
import com.park24.parking.dto.ParkingLotRequestDTO;
import com.park24.parking.dto.ParkingLotResponseDTO;
import com.park24.shared.dto.ApiResponseDTO;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/parking")
@RequiredArgsConstructor
public class ParkingController {

	private final ParkingLotService parkingService;

	@PostMapping
	public ResponseEntity<ApiResponseDTO<ParkingLotResponseDTO>> createParking(
			@Valid @RequestBody ParkingLotRequestDTO request) {

		return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponseDTO.ok(parkingService.createParkingLot(request),
				"Parking Created Successfully", HttpStatus.CREATED.value()));
	}
}