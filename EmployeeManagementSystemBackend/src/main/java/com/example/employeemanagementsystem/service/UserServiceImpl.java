package com.example.employeemanagementsystem.service;

import com.example.employeemanagementsystem.dto.UserDto;
import com.example.employeemanagementsystem.model.User;
import com.example.employeemanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
// Note: This file seems to be a duplicate in your prompt.
// I am modifying the correct UserServiceImpl.
import org.springframework.security.core.userdetails.UserDetails; 

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public User registerUser(UserDto userDto) {
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword())); // Hash the password
        
        // ✨ MODIFIED THIS SECTION
        // Use the role from the DTO if it exists, otherwise default to EMPLOYEE
        if (userDto.getRole() != null && !userDto.getRole().isEmpty()) {
            user.setRole(userDto.getRole());
        } else {
            user.setRole("EMPLOYEE"); // Default role
        }
        // ✨ END MODIFICATION
        
        return userRepository.save(user);
    }

    @Override
    public UserDetails findByEmail(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            // Spring Security expects roles to start with "ROLE_"
            // Your JwtUtil and SecurityConfig already handle this, but it's good practice.
            String role = user.getRole().startsWith("ROLE_") ? user.getRole() : "ROLE_" + user.getRole();
            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), Collections.singletonList(() -> role));
        }
        return null;
    }
}