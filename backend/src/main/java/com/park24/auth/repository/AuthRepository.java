package com.park24.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.park24.user.entity.User;

@Repository
public interface AuthRepository extends JpaRepository<User, Long> {
     Optional<User> findByPhoneNumber(String phoneNumber);
}
