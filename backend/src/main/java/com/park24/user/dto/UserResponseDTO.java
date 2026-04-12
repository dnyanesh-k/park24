package com.park24.user.dto;

import com.park24.user.enums.Role;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {

    private Long userId;
//    private String email;
//    private String username;
    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private Role role;
   
}
