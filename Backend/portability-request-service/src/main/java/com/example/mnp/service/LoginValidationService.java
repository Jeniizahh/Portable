package com.example.mnp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mnp.model.Subscriber;
import com.example.mnp.repository.SubscriberRepository;

@Service
	public class LoginValidationService {
	    private final SubscriberRepository subscriberRepo;

	    @Autowired
	    public LoginValidationService(SubscriberRepository subscriberRepo) {
	        this.subscriberRepo = subscriberRepo;
	    }

	    public boolean validateMobileNumber(Long msisdn) {
	        System.out.println("Received MSISDN: " + msisdn);
	        Subscriber sub = subscriberRepo.findByMsisdn(msisdn);
	        System.out.println("Lookup result: " + sub);
	        return sub != null;
	    }

	}


