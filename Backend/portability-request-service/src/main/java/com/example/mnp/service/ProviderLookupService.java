package com.example.mnp.service;

import com.example.mnp.model.Subscriber;
import com.example.mnp.repository.SubscriberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProviderLookupService {

    private final SubscriberRepository subscriberRepo;

    @Autowired
    public ProviderLookupService(SubscriberRepository subscriberRepo) {
        this.subscriberRepo = subscriberRepo;
    }

    public Integer getCurrentProvider(Long msisdn) {
        Subscriber sub = subscriberRepo.findByMsisdn(msisdn);
        return (sub != null) ? sub.getCurrentProvider() : null;
    }
}

