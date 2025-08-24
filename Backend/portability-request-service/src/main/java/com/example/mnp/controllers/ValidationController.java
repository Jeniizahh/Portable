package com.example.mnp.controllers;

import com.example.mnp.service.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/requests")
public class ValidationController {

    @Autowired
    private ValidationService validationService;

    @PostMapping("/validate")
    public ResponseEntity<String> validateSubscriber(@RequestBody ValidationRequest req) {
        boolean isValid = validationService.validateSubscriber(req.getMsisdn(), req.getImsi(), req.getIdType(), req.getIdNumber());
        return ResponseEntity.ok(isValid ? "Valid Subscriber" : "Invalid Subscriber");
    }
}

class ValidationRequest {
    private Long msisdn;
    private Long imsi;
    private String idType;
    private String idNumber;

    // Getters and Setters
    public Long getMsisdn() { return msisdn; }
    public void setMsisdn(Long msisdn) { this.msisdn = msisdn; }
    public Long getImsi() { return imsi; }
    public void setImsi(Long imsi) { this.imsi = imsi; }
    public String getIdType() { return idType; }
    public void setIdType(String idType) { this.idType = idType; }
    public String getIdNumber() { return idNumber; }
    public void setIdNumber(String idNumber) { this.idNumber = idNumber; }
}
