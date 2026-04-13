package com.park24.parking.service;

import com.park24.parking.dto.ParkingLotRequestDTO;
import com.park24.parking.dto.ParkingLotResponseDTO;

public interface ParkingLotService {

    ParkingLotResponseDTO createParkingLot(ParkingLotRequestDTO parkingRequestDTO);
}