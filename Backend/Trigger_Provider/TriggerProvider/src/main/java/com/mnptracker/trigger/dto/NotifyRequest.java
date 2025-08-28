package com.mnptracker.trigger.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class NotifyRequest {
  @Schema(example = "Airtel")
  private String targetProvider;
  @Schema(example = "12345-req-abc")
  private String correlationId; // track this across providers
  @Schema(example = "+919152782493")
  private String msisdn;
  @Schema(example = "374689632851257")
  private String imsi;
  public String getTargetProvider() {
	return targetProvider;
  }
  public void setTargetProvider(String targetProvider) {
	this.targetProvider = targetProvider;
  }
  public String getCorrelationId() {
	return correlationId;
  }
  public void setCorrelationId(String correlationId) {
	this.correlationId = correlationId;
  }
  public String getMsisdn() {
	return msisdn;
  }
  public void setMsisdn(String msisdn) {
	this.msisdn = msisdn;
  }
  public String getImsi() {
	return imsi;
  }
  public void setImsi(String imsi) {
	this.imsi = imsi;
  }
  
}

