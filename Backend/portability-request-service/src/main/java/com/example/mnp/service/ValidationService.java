package com.example.mnp.service;

import com.example.mnp.model.Subscriber;
import com.example.mnp.repository.SubscriberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ValidationService {

    @Autowired
    private SubscriberRepository subscriberRepo;

    public boolean validateSubscriber(Long msisdn, Long imsi, String idType, String idNumber) {
        Subscriber sub = subscriberRepo.findByMsisdn(msisdn);
        if(sub == null) return false;
        return sub.getImsi().equals(imsi) && sub.getIdType().equalsIgnoreCase(idType)
               && sub.getIdNumber().equalsIgnoreCase(idNumber);
    }

	public String getSubscriberNameByMsisdn(Long msisdn) {
		// TODO Auto-generated method stub
		return null;
	}
}
