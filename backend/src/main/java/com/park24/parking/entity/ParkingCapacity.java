package com.park24.parking.entity;

import javax.annotation.processing.Generated;

import com.park24.parking.enums.VehicleType;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParkingCapacity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated()
    private VehicleType vehicleType;

    @Column(nullable = false)
    private Long parkingLotId;

    private int totalCapacity;

    private int occupiedCapacity;

}
