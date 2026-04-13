package com.park24.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserLoginDTO {

//    @NotBlank(message = "Username is required!")
//    private String username;

    @NotBlank(message = "Phone Number is required!")
    private String phoneNumber;

    @NotBlank(message = "Password is required!")
    private String passwordHash;

}
