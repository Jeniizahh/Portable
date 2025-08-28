package com.mnptracker.trigger.service;

import com.mnptracker.trigger.domain.Provider;
import com.mnptracker.trigger.dto.NotifyRequest;
import com.mnptracker.trigger.dto.ProviderResponse;
import com.mnptracker.trigger.repository.ProviderRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class APIClientService {

    private final WebClient webClient;
    private final ProviderRepository providerRepo;
    private final SignatureService signatureService;
    private final ResponseHandlerService responseHandlerService;

    public APIClientService(WebClient.Builder webClientBuilder,
                            ProviderRepository providerRepo,
                            SignatureService signatureService,
                            ResponseHandlerService responseHandlerService) {
        // ✅ ensure WebClient is properly built
        this.webClient = webClientBuilder.build();
        this.providerRepo = providerRepo;
        this.signatureService = signatureService;
        this.responseHandlerService = responseHandlerService;
    }

    @CircuitBreaker(name = "providerNotify", fallbackMethod = "notifyFallback")
    @Retry(name = "providerNotify")
    public ProviderResponse notifyProvider(NotifyRequest req) {
        Provider provider = providerRepo.findByNameIgnoreCase(req.getTargetProvider())
                .orElseThrow(() -> new IllegalArgumentException("Unknown provider: " + req.getTargetProvider()));

        String url = provider.getApiEndpoint() + "/mnp/notify";
        String payload = String.format("{\"msisdn\":\"%s\",\"imsi\":\"%s\"}", req.getMsisdn(), req.getImsi());
        //String signature = signatureService.sign(payload, req.getCorrelationId());

        String responseBody = webClient.post()
                .uri(url)
                //.header("X-Correlation-Id", req.getCorrelationId())
               // .header("X-Signature", signature)
                .headers(h -> {
                    if (provider.getAuthHeader() != null) {
                        h.add(HttpHeaders.AUTHORIZATION, provider.getAuthHeader());
                    }
                })
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(String.class)
                .onErrorResume(ex -> Mono.just("ERROR:" + ex.getMessage()))
                .block();

        int status = (responseBody != null && responseBody.startsWith("ERROR:")) ? 500 : 200;

        // ✅ always safe to call logging service
        responseHandlerService.record(
                provider.getName(),
                "POST",
                url,
                payload,
                status,
                responseBody
                //req.getCorrelationId()
        );
		return null;

       /* return new ProviderResponse(req.getCorrelationId(),
                status == 200 ? "SENT" : "FAILED",
                responseBody);*/
    }

    // ✅ fallback MUST have same args + Throwable
    private ProviderResponse notifyFallback(NotifyRequest req, Throwable t) {
        // Safe check before using services
        if (responseHandlerService != null) {
            responseHandlerService.record(
                    req.getTargetProvider(),
                    "POST",
                    "FALLBACK",
                    req.toString(),
                    503,
                    "Circuit open or retries exhausted: " + t.getMessage()
                    //req.getCorrelationId()
            );
        }

        return new ProviderResponse(
        );
    }
}
