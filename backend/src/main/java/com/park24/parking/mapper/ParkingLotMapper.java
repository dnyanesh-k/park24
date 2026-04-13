package com.park24.parking.mapper;

import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.park24.parking.dto.ParkingLotRequestDTO;
import com.park24.parking.dto.ParkingLotResponseDTO;
import com.park24.parking.entity.ParkingLot;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = true))
public interface ParkingLotMapper {

    @Mapping(target = "id", ignore = true)
    ParkingLot toEntity(ParkingLotRequestDTO dto);

    ParkingLotResponseDTO toDTO(ParkingLot entity);
}