package com.mnptracker.trigger.dto;

import lombok.Data;

@Data
public class AckRequest {
  private String correlationId;
  private String status; // e.g., RECEIVED/ACCEPTED/REJECTED
  private String remarks;
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
  public String getRemarks() {
	return remarks;
  }
  public void setRemarks(String remarks) {
	this.remarks = remarks;
  }
  
}

