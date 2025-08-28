package com.example.mnp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "port_request") // match table name in DB
public class PortRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mobile_number", nullable = false)
    private Long mobileNumber;    // Changed from String to Long

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "current_provider", nullable = false)
    private Provider currentProvider;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "preferred_provider", nullable = false)
    private Provider preferredProvider;

    @Column(name = "imsi", nullable = false)
    private Long imsi;            // Changed from String to Long

    @Column(name = "proof_id_type", nullable = false, length = 50)
    private String proofIdType;

    @Column(name = "proof_id_number", nullable = false, length = 50)
    private String proofIdNumber;

    @Column(name = "request_reference_id", nullable = false, unique = true)
    private String requestReferenceId;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and setters below

    public Long getId() {
        return id;
    }

    public Long getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(Long mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public Provider getCurrentProvider() {
        return currentProvider;
    }

    public void setCurrentProvider(Provider currentProvider) {
        this.currentProvider = currentProvider;
    }

    public Provider getPreferredProvider() {
        return preferredProvider;
    }

    public void setPreferredProvider(Provider preferredProvider) {
        this.preferredProvider = preferredProvider;
    }

    public Long getImsi() {
        return imsi;
    }

    public void setImsi(Long imsi) {
        this.imsi = imsi;
    }

    public String getProofIdType() {
        return proofIdType;
    }

    public void setProofIdType(String proofIdType) {
        this.proofIdType = proofIdType;
    }

    public String getProofIdNumber() {
        return proofIdNumber;
    }

    public void setProofIdNumber(String proofIdNumber) {
        this.proofIdNumber = proofIdNumber;
    }

    public String getRequestReferenceId() {
        return requestReferenceId;
    }

    public void setRequestReferenceId(String requestReferenceId) {
        this.requestReferenceId = requestReferenceId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
