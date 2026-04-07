package com.landmark.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.landmark.user.entity.User;

@Repository
public interface AuthRepository extends JpaRepository<User, Long> {
     Optional<User> findByPhoneNumber(String phoneNumber);
}
