package com.example.employeemanagementsystem.service;

import com.example.employeemanagementsystem.dto.UserDto;
import com.example.employeemanagementsystem.model.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {
    User registerUser(UserDto userDto);
    UserDetails findByEmail(String email);
}
