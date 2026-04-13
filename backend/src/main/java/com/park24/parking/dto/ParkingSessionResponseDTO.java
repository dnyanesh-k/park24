package com.park24.parking.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.park24.parking.enums.SessionStatus;
import com.park24.parking.enums.VehicleType;

public class ParkingSessionResponseDTO {

    public Long id;

    public String vehicleNumber;

    public VehicleType vehicleType;

    public LocalDateTime entryTime;

    public LocalDateTime exitTime;

    public SessionStatus sessionStatus;
}
