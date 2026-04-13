package com.park24.parking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ParkingLotResponseDTO {

    private Long id;
    private String name;
    private String location;
    private Long ownerId;
}