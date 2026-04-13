package com.park24.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.park24.parking.exception.ParkingException;

@Component
public class SecurityUtil {

    public Long getCurrentUserId() {

        Object principal = SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        if (principal instanceof CustomUserDetails user) {
            return user.getId();
        }
        System.out.println(
        	    SecurityContextHolder.getContext().getAuthentication()
        	);
        throw new ParkingException("User not authenticated");
    }
}