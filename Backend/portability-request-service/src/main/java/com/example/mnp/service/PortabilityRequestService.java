package com.example.mnp.service;

import com.example.mnp.model.PortabilityRequest;
import com.example.mnp.repository.PortabilityRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
public class PortabilityRequestService {

    @Autowired
    private PortabilityRequestRepository repository;

    public PortabilityRequest createRequest(PortabilityRequest request) {
        request.setRequestReferenceId(UUID.randomUUID().toString());
        if(request.getStatus() == null) request.setStatus("pending");
        if(request.getReasonCode() == null) request.setReasonCode("");
        return repository.save(request);
    }

    public Optional<PortabilityRequest> getRequestById(Long subscriberId) {
        return repository.findById(subscriberId);
    }
}
