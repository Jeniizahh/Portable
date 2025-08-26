package com.example.mnp.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "portability_request")
public class PortabilityRequest {

    @Id
    @Column(name = "subscriber_id", nullable = false)
    private Long subscriberId;

    @Column(name = "request_reference_id", nullable = false, unique = true)
    private String requestReferenceId;

    @Column(name = "current_provider", nullable = false)
    private String currentProvider;

    @Column(name = "preferred_provider", nullable = false)
    private String preferredProvider;

    @Column(name = "imsi", nullable = false, length = 15)
    private String imsi;

    @Column(name = "proof_id_type", nullable = false)
    private String proofIdType;

    @Column(name = "proof_id_number", nullable = false)
    private String proofIdNumber;

    @Column(name = "status")
    private String status;

    @Column(name = "reason_code")
    private String reasonCode;

    // Getters and setters for all fields
    public Long getSubscriberId() { return subscriberId; }
    public void setSubscriberId(Long subscriberId) { this.subscriberId = subscriberId; }

    public String getRequestReferenceId() { return requestReferenceId; }
    public void setRequestReferenceId(String requestReferenceId) { this.requestReferenceId = requestReferenceId; }

    public String getCurrentProvider() { return currentProvider; }
    public void setCurrentProvider(String currentProvider) { this.currentProvider = currentProvider; }

    public String getPreferredProvider() { return preferredProvider; }
    public void setPreferredProvider(String preferredProvider) { this.preferredProvider = preferredProvider; }

    public String getImsi() { return imsi; }
    public void setImsi(String imsi) { this.imsi = imsi; }

    public String getProofIdType() { return proofIdType; }
    public void setProofIdType(String proofIdType) { this.proofIdType = proofIdType; }

    public String getProofIdNumber() { return proofIdNumber; }
    public void setProofIdNumber(String proofIdNumber) { this.proofIdNumber = proofIdNumber; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getReasonCode() { return reasonCode; }
    public void setReasonCode(String reasonCode) { this.reasonCode = reasonCode; }
}
