package com.example.airtel.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mnp")
public class AirtelController {

    @PostMapping("/notify")
    public ResponseEntity<String> notifyMnp(@RequestBody String payload) {
        //System.out.println("Airtel-service received payload: " + payload);
        return ResponseEntity.ok("Airtel-service received: " + payload);
    }
}

