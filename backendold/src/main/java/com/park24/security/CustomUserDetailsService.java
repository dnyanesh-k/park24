package com.park24.security;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.park24.auth.repository.AuthRepository;
import com.park24.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AuthRepository authRepository;

    @Override
    public UserDetails loadUserByUsername(String phoneNumber)
            throws UsernameNotFoundException {

        User user = authRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found with phone: " + phoneNumber));

        return org.springframework.security.core.userdetails.User
                .builder()
                .username(user.getPhoneNumber())
                .password(user.getPasswordHash())
                .authorities(
                        List.of(new SimpleGrantedAuthority(
                                "ROLE_" + user.getRole().name()
                        ))
                )
                .build();
    }
}