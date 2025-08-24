package com.example.mnp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "subscriber")
public class Subscriber {

    @Id
    @Column(name = "subscriber_id", nullable = false)
    private Long subscriberId;  // MANUAL assignment

    @Column(name = "msisdn", nullable = false, unique = true)
    private Long msisdn;

    @Column(name = "imsi", nullable = false)
    private Long imsi;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "id_type", length = 50, nullable = false)
    private String idType;

    @Column(name = "id_number", length = 50, nullable = false)
    private String idNumber;

    @Column(name = "current_provider_id", nullable = false)
    private Integer currentProvider;

    @Column(name = "service_type", length = 20, nullable = false)
    private String serviceType;

    // Getters and Setters
    public Long getSubscriberId() { return subscriberId; }
    public void setSubscriberId(Long subscriberId) { this.subscriberId = subscriberId; }
    public Long getMsisdn() { return msisdn; }
    public void setMsisdn(Long msisdn) { this.msisdn = msisdn; }
    public Long getImsi() { return imsi; }
    public void setImsi(Long imsi) { this.imsi = imsi; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getIdType() { return idType; }
    public void setIdType(String idType) { this.idType = idType; }
    public String getIdNumber() { return idNumber; }
    public void setIdNumber(String idNumber) { this.idNumber = idNumber; }
    public Integer getCurrentProvider() { return currentProvider; }
    public void setCurrentProvider(Integer currentProvider) { this.currentProvider = currentProvider; }
    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }
}
