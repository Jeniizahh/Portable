package com.mnptracker.trigger.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.mnptracker.trigger.util.HashUtil;

@Service
public class SignatureService {
  @Value("${security.shared-secret:changeme}")
  private String sharedSecret;

  public String sign(String payload, String correlationId) {
    return HashUtil.sha256(payload + ":" + correlationId + ":" + sharedSecret);
  }

  public boolean verify(String payload, String correlationId, String signature) {
    return sign(payload, correlationId).equals(signature);
  }
}

