package com.mnptracker.trigger.service;
import com.mnptracker.trigger.domain.APIRequestLog;
import com.mnptracker.trigger.domain.Provider;
import com.mnptracker.trigger.dto.AckRequest;
import com.mnptracker.trigger.repository.APIRequestLogRepository;
import com.mnptracker.trigger.repository.ProviderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.OffsetDateTime;

@Service
public class ResponseHandlerService {
  private final APIRequestLogRepository logRepo;

  public ResponseHandlerService(APIRequestLogRepository logRepo) {
    this.logRepo = logRepo;
  }
  @Autowired
  private ProviderRepository providerRepo;

  public void record(String provider, String method, String url, String body,
          Integer statusCode, String response, String correlationId) {
	  Provider provider1 = providerRepo.findByNameIgnoreCase(provider)
			    .orElseThrow(() -> new RuntimeException("Provider not found: " + provider));

			logRepo.insertLog(
			    provider1.getId(),
			    method,
			    url,
			    body,
			    statusCode,
			    response,
			    correlationId,
			    OffsetDateTime.now()
			);
// ✅ Use the provider argument directly
/*Provider provider1 = providerRepo.findByNameIgnoreCase(provider)
   .orElseThrow(() -> new RuntimeException("Provider not found: " + provider));

APIRequestLog log = APIRequestLog.builder()
   .provider(provider1)
   //.direction(method)              // ✅ "direction" field in entity
   .url(url)
   .requestBody(body)
   .httpStatus(statusCode)         // ✅ entity has httpStatus not statusCode
   .responseBody(response)
   .correlationId(correlationId)
   .createdAt(OffsetDateTime.now())
   .build();

logRepo.save(log);*/
}
  /*public void handleAck(AckRequest ack) {
    // Extend to update your MNP request status table if present
    // For now, we simply insert an entry for observability.
    record("incoming-ack", "POST", "/provider/ack",
        ack.toString(), 200, "ACK-RECORDED", ack.getCorrelationId());
  }*/
}

