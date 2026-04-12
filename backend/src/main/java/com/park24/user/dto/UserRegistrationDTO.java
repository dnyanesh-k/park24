package com.park24.user.dto;

import com.park24.user.enums.Role;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDTO {

//    @NotBlank(message = "Username is required!")
//    @Size(min = 4, max = 20, message = "Username must be at least 4 characters and maximum 20 characters")
//    private String username;

    @NotBlank(message = "FirstName is required!")
    @Size(min = 2, max = 50, message = "FirstName must be atleast 2 characters!")
    private String firstName;

    @NotBlank(message = "LastName is required!")
    @Size(min = 2, max = 50, message = "LastName must be atleast 2 characters!")
    private String lastName;

//    @NotBlank(message = "Email is required!")
//    @Email(message = "Invalid email format!")
//    private String email;

    @NotBlank(message = "PhoneNumber is required!")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid phone number! Must be a 10-digit Indian mobile number.")
    private String phoneNumber;

    @NotNull(message = "Role is required!")
    private Role role;

    @NotBlank(message = "Password is required!")
    @Size(min = 4, max = 72, message = "Password must be between 4 and 72 characters!")
//    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", message = "Password must contain atleast one digit, one uppercase, one lowercase and one special characters.")
    private String passwordHash;
    
    @NotNull(message = "Address is Required!")
    private String address;

}
