package com.mnptracker.trigger.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class ProviderResponse {
  private String correlationId;
  private String status; // e.g., SENT/FAILED
  private String message;
  public ProviderResponse() {
  }
  public ProviderResponse(String correlationId, Object status, String message) {
	    this.correlationId = correlationId;
	    this.status = status != null ? status.toString() : null;
	    this.message = message;
	}
  public String getCorrelationId() {
	return correlationId;
  }
  public void setCorrelationId(String correlationId) {
	this.correlationId = correlationId;
  }
  public String getStatus() {
	return status;
  }
  public void setStatus(String status) {
	this.status = status;
  }
  public String getMessage() {
	return message;
  }
  public void setMessage(String message) {
	this.message = message;
  }
  
}

