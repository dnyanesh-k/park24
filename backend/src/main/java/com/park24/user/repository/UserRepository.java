package com.park24.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.park24.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

//    Optional<User> findByEmail(String email);

    public boolean existsByPhoneNumber(String phoneNumber);

    Optional<User> findByPhoneNumber(String phoneNumber);

    Optional<User> findById(Long id);

}
