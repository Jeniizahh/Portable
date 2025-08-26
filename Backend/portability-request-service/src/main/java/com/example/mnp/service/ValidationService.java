package com.example.mnp.service;

import com.example.mnp.model.Subscriber;
import com.example.mnp.repository.SubscriberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ValidationService {

    @Autowired
    private SubscriberRepository subscriberRepo;

    public boolean validateSubscriber(Long msisdn, Long imsi, String idType, String idNumber, Integer currentProviderId) {
        Subscriber sub = subscriberRepo.findByMsisdn(msisdn);
        if(sub == null) return false;

        
        return sub.getImsi().equals(imsi)
            && sub.getIdType().trim().equalsIgnoreCase(idType.trim())
            && sub.getIdNumber().trim().equalsIgnoreCase(idNumber.trim())
            && sub.getCurrentProvider().getProviderId().equals(currentProviderId);
    }
    /*public boolean validateSubscriber(Long msisdn, Long imsi, String idType, String idNumber) {
    	Subscriber sub = subscriberRepo.findByMsisdn(msisdn);
        if(sub == null) return false;

        System.out.println("DB msisdn: " + sub.getMsisdn() + ", Input: " + msisdn);
        System.out.println("DB imsi: " + sub.getImsi() + ", Input: " + imsi);
        System.out.println("DB idType: '" + sub.getIdType().trim() + "', Input: '" + idType.trim() + "'");
        System.out.println("DB idNumber: '" + sub.getIdNumber().trim() + "', Input: '" + idNumber.trim() + "'");

        return sub.getImsi().equals(imsi)
               && sub.getIdType().trim().equalsIgnoreCase(idType.trim())
               && sub.getIdNumber().trim().equalsIgnoreCase(idNumber.trim());
   
    }*/

	public String getSubscriberNameByMsisdn(Long msisdn) {
		// TODO Auto-generated method stub
		return null;
	}
}
