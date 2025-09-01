package com.example.mnp.controllers;

import com.example.mnp.model.PortabilityRequest;
import com.example.mnp.service.PortabilityRequestService;

import io.swagger.v3.oas.annotations.Operation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/requests")
public class PortabilityRequestController {

    @Autowired
    private PortabilityRequestService service;

    @Operation(summary = "Creates a new portability request.")
    @PostMapping
    public ResponseEntity<PortabilityRequest> createRequest(@RequestBody PortabilityRequest request) {
        return ResponseEntity.ok(service.createRequest(request));
    }
    @Operation(summary = "Checks for the validity of the subscriber details.")
    @GetMapping("/{subscriberId}")
    public ResponseEntity<PortabilityRequest> getRequest(@PathVariable Long subscriberId) {
        Optional<PortabilityRequest> req = service.getRequestById(subscriberId);
        return req.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
