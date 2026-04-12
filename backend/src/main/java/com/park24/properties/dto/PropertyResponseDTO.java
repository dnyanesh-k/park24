package com.park24.properties.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PropertyResponseDTO {

    private Long id;
    private String title;
    private String description;
    private Long price;
    private Long areaSqFt;
    private String city;
    private String address;
    private String plotNumber;
    private String surveyNumber;
    private Long sellerId;
    private LocalDateTime createdAt;
    private List<String> imageUrls;
}