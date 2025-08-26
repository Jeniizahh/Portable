package com.example.mnp.controllers;
import java.util.Map;
import com.example.mnp.service.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/requests")
@CrossOrigin(origins = "http://localhost:3000")
public class ValidationController {

    @Autowired
    private ValidationService validationService;

    @PostMapping("/validate")
    public ResponseEntity<String> validateSubscriber(@RequestBody ValidationRequest req) {
        boolean isValid = validationService.validateSubscriber(req.getMsisdn(), req.getImsi(), req.getIdType(), req.getIdNumber(), req.getCurrentProvider());
        return ResponseEntity.ok(isValid ? "Valid Subscriber" : "Invalid Subscriber");
    }
}
   /* @PostMapping("/validate")
    public ResponseEntity<Map<String, String>> validateSubscriber(@RequestBody ValidationRequest req) {
        boolean isValid = validationService.validateSubscriber(
            req.getMsisdn(), req.getImsi(), req.getIdType(), req.getIdNumber(), req.getCurrentProvider()
        );
        String status = isValid ? "success" : "error";
        String message = isValid ? "Valid Subscriber" : "Invalid Subscriber";
        return ResponseEntity.ok(Map.of("status", status, "message", message));
    }*/
class ValidationRequest {
    private Long msisdn;
    private Long imsi;
    private String idType;
    private String idNumber;
    private Integer currentProvider; 
    // Getters and Setters
    public Long getMsisdn() { return msisdn; }
    public void setMsisdn(Long msisdn) { this.msisdn = msisdn; }
    public Long getImsi() { return imsi; }
    public void setImsi(Long imsi) { this.imsi = imsi; }
    public String getIdType() { return idType; }
    public void setIdType(String idType) { this.idType = idType; }
    public String getIdNumber() { return idNumber; }
    public void setIdNumber(String idNumber) { this.idNumber = idNumber; }
	public Integer getCurrentProvider() {
		return currentProvider;
	}
	public void setCurrentProvider(Integer currentProvider) {
		this.currentProvider = currentProvider;
	}
}
