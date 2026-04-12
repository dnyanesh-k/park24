package com.park24.parking.entity;

import java.time.LocalDateTime;

public class ParkingSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String vehicleNumber;

    private VehicleType vehicleType;

    private LocalDateTime entryTime;

    private LocalDateTime exitTime;

    private Long parkingLotId;

    private SessionStatus sessionStatus;

}
