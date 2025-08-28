package com.mnptracker.trigger.repository;
import com.mnptracker.trigger.domain.APIRequestLog;

import jakarta.transaction.Transactional;

import java.time.OffsetDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

//public interface APIRequestLogRepository extends JpaRepository<APIRequestLog, Long> { 
	@Repository
	public interface APIRequestLogRepository extends JpaRepository<APIRequestLog, Long> {

	    @Modifying
	    @Transactional
	    @Query(value = "INSERT INTO api_request_log " +
	            "(provider_id, direction, url, request_body, http_status, response_body, correlation_id, created_at) " +
	            "VALUES (:providerId, :direction, :url, :requestBody, :httpStatus, :responseBody, :correlationId, :createdAt)",
	            nativeQuery = true)
	    void insertLog(@Param("providerId") Long providerId,
	                   @Param("direction") String direction,
	                   @Param("url") String url,
	                   @Param("requestBody") String requestBody,
	                   @Param("httpStatus") Integer httpStatus,
	                   @Param("responseBody") String responseBody,
	                   @Param("correlationId") String correlationId,
	                   @Param("createdAt") OffsetDateTime createdAt);
	}


