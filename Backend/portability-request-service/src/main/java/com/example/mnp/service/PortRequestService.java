package com.example.mnp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mnp.model.PortRequest;
import com.example.mnp.repository.PortRequestRepository;

import java.util.UUID;

@Service
public class PortRequestService {

    @Autowired
    private PortRequestRepository repository;

    public PortRequest savePortRequest(PortRequest request) {
        // Generate reference ID here before saving
        request.setRequestReferenceId(UUID.randomUUID().toString());
        return repository.save(request);
    }
}
