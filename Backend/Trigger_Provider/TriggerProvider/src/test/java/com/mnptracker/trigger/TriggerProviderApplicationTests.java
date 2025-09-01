package com.mnptracker.trigger;

import com.mnptracker.trigger.controller.ProviderCommController;
import com.mnptracker.trigger.controller.ProviderCommController;
import com.mnptracker.trigger.dto.NotifyRequest;
import com.mnptracker.trigger.dto.ProviderResponse;
import com.mnptracker.trigger.service.APIClientService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TriggerProviderApplicationTests {

    @InjectMocks
    private ProviderCommController controller;

    @Mock
    private APIClientService apiClientService;

    @Mock
    private com.mnptracker.trigger.service.ResponseHandlerService responseHandlerService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testNotify_success() {
        NotifyRequest req = new NotifyRequest();
        req.setTargetProvider("Airtel");
        req.setMsisdn(1234567890L);
        req.setImsi(9876543210L);

        ProviderResponse mockResponse = new ProviderResponse();
        mockResponse.setStatus("SUCCESS");
        mockResponse.setMessage("Received for Airtel");

        when(apiClientService.notifyProvider(req)).thenReturn(mockResponse);

        ResponseEntity<ProviderResponse> response = controller.notify(req);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("SUCCESS", response.getBody().getStatus());
        assertTrue(response.getBody().getMessage().contains("Airtel"));

        verify(apiClientService, times(1)).notifyProvider(req);
    }

}

