package com.example.mnp.controllers;

import com.example.mnp.model.PortabilityRequest;
import com.example.mnp.service.PortabilityRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/requests")
public class PortabilityRequestController {

    @Autowired
    private PortabilityRequestService service;

    @PostMapping
    public ResponseEntity<PortabilityRequest> createRequest(@RequestBody PortabilityRequest request) {
        return ResponseEntity.ok(service.createRequest(request));
    }

    @GetMapping("/{subscriberId}")
    public ResponseEntity<PortabilityRequest> getRequest(@PathVariable Long subscriberId) {
        Optional<PortabilityRequest> req = service.getRequestById(subscriberId);
        return req.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
