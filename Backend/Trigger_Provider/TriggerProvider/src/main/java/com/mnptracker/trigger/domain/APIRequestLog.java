package com.mnptracker.trigger.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "api_request_log")
public class APIRequestLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true, length = 10)
    private String direction;

    @Column(nullable = false)
    private String url;

    @Column(columnDefinition = "jsonb")
    private String requestBody;

    @Column(columnDefinition = "jsonb")
    private String responseBody;

    @Column(name = "http_status")
    private Integer httpStatus;

    @Column(nullable = false, length = 50)
    private String correlationId;

    @ManyToOne
    @JoinColumn(name = "provider_id", referencedColumnName = "provider_id")
    private Provider provider;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    private APIRequestLog(Builder builder) {
        this.id = builder.id;
        this.direction = builder.direction;
        this.url = builder.url;
        this.requestBody = builder.requestBody;
        this.responseBody = builder.responseBody;
        this.httpStatus = builder.httpStatus;
        this.correlationId = builder.correlationId;
        this.provider = builder.provider;
        this.createdAt = builder.createdAt;
    }

    // ✅ Add static factory method
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String direction;
        private String url;
        private String requestBody;
        private String responseBody;
        private Integer httpStatus;
        private String correlationId;
        private Provider provider;
        private OffsetDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder direction(String direction) { this.direction = direction; return this; }
        public Builder url(String url) { this.url = url; return this; }
        public Builder requestBody(String requestBody) { this.requestBody = requestBody; return this; }
        public Builder responseBody(String responseBody) { this.responseBody = responseBody; return this; }
        public Builder httpStatus(Integer httpStatus) { this.httpStatus = httpStatus; return this; }
        public Builder correlationId(String correlationId) { this.correlationId = correlationId; return this; }
        public Builder provider(Provider provider) { this.provider = provider; return this; }
        public Builder createdAt(OffsetDateTime createdAt) { this.createdAt = createdAt; return this; }

        public APIRequestLog build() { return new APIRequestLog(this); }
    }
}
