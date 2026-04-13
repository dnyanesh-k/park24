package com.park24.parking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParkingLotRequestDTO {

    @NotBlank(message = "Parking lot name is required")
    private String name;

    @NotBlank(message = "Location is required")
    private String location;
}