package com.example.mnp.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mnp.service.LoginValidationService;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")

public class LoginController {

    private final LoginValidationService loginValidationService;

    @Autowired
    public LoginController(LoginValidationService loginValidationService) {
        this.loginValidationService = loginValidationService;
    }

    @PostMapping("/validate")
    public ResponseEntity<String> validateMobile(@RequestBody Map<String, Long> requestBody) {
        Long msisdn = requestBody.get("msisdn");
        boolean isValid = loginValidationService.validateMobileNumber(msisdn);
        return ResponseEntity.ok(isValid ? "Valid Subscriber" : "Invalid Subscriber");
    }
}
