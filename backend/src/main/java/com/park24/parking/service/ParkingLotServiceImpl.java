package com.park24.parking.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.park24.parking.dto.ParkingLotRequestDTO;
import com.park24.parking.dto.ParkingLotResponseDTO;
import com.park24.parking.entity.ParkingLot;
import com.park24.parking.exception.ParkingException;
import com.park24.parking.mapper.ParkingLotMapper;
import com.park24.parking.repository.ParkingLotRepository;
import com.park24.security.SecurityUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ParkingLotServiceImpl implements ParkingLotService {

    private final ParkingLotRepository parkingLotRepository;
    private final ParkingLotMapper parkingLotMapper;
    private final SecurityUtil securityUtil;

    @Override
    @Transactional
    public ParkingLotResponseDTO createParkingLot(ParkingLotRequestDTO request) {

        parkingLotRepository.findByName(request.getName())
                .ifPresent(p -> {
                    throw new ParkingException("Parking lot already exists with name: " + request.getName());
                });
        Long ownerId = securityUtil.getCurrentUserId();

        ParkingLot entity = parkingLotMapper.toEntity(request);

        // ✅ set owner from logged-in user
        entity.setOwnerId(ownerId);

        ParkingLot saved = parkingLotRepository.save(entity);

        return parkingLotMapper.toDTO(saved);
    }
}