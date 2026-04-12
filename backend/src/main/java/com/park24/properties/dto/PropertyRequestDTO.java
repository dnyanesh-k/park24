package com.park24.properties.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PropertyRequestDTO {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private Long price;

    @NotNull
    private Long areaSqFt;

    @NotBlank
    private String city;

    private String address;

    private String plotNumber;

    private String surveyNumber;

    @NotNull
    private Long sellerId;
}