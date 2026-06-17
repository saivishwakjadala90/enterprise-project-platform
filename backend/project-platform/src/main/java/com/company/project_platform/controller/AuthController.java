package com.company.project_platform.controller;

import com.company.project_platform.dto.LoginRequest;
import com.company.project_platform.dto.LoginResponse;
import com.company.project_platform.entity.User;
import com.company.project_platform.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElse(null);

        if (user == null) {
            return new LoginResponse("Invalid email", null, null);
        }

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return new LoginResponse("Invalid password", null, null);
        }

        return new LoginResponse("Login successful", user.getEmail(), user.getRole());
    }
}