package com.example.mnp.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "portability_request")
public class PortabilityRequest {

    @Id
    @Column(name = "subscriber_id", nullable = false)
    private Long subscriberId; // Manual assignment, same as Subscriber

    @Column(name = "request_reference_id", nullable = false)
    private String requestReferenceId; // Generated in service

    @Column(name = "status")
    private String status;

    @Column(name = "reason_code")
    private String reasonCode;

    // Getters and Setters
    public Long getSubscriberId() { return subscriberId; }
    public void setSubscriberId(Long subscriberId) { this.subscriberId = subscriberId; }

    public String getRequestReferenceId() { return requestReferenceId; }
    public void setRequestReferenceId(String requestReferenceId) { this.requestReferenceId = requestReferenceId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getReasonCode() { return reasonCode; }
    public void setReasonCode(String reasonCode) { this.reasonCode = reasonCode; }
}
