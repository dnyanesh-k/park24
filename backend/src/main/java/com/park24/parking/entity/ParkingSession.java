package com.park24.parking.entity;

import java.time.LocalDateTime;

import com.park24.parking.enums.SessionStatus;
import com.park24.parking.enums.VehicleType;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "parking_sessions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParkingSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String vehicleNumber;

    @Enumerated(EnumType.STRING)
    private VehicleType vehicleType;

    private LocalDateTime entryTime;

    private LocalDateTime exitTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parking_lot_id", nullable = false)
    private ParkingLot parkingLot;

    @Enumerated(EnumType.STRING)
    private SessionStatus sessionStatus;
}