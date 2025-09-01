package com.example.mnp;

import com.example.mnp.controllers.ValidationController;
import com.example.mnp.service.ValidationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import org.springframework.http.ResponseEntity;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ValidationControllerTest {

    @InjectMocks
    private ValidationController validationController;

    @Mock
    private ValidationService validationService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    public static class ValidationRequest {
        private Long msisdn;
        private Long imsi;
        private String idType;
        private String idNumber;
        private Integer currentProvider;

        public Long getMsisdn() { return msisdn; }
        public void setMsisdn(Long msisdn) { this.msisdn = msisdn; }
        public Long getImsi() { return imsi; }
        public void setImsi(Long imsi) { this.imsi = imsi; }
        public String getIdType() { return idType; }
        public void setIdType(String idType) { this.idType = idType; }
        public String getIdNumber() { return idNumber; }
        public void setIdNumber(String idNumber) { this.idNumber = idNumber; }
        public Integer getCurrentProvider() { return currentProvider; }
        public void setCurrentProvider(Integer currentProvider) { this.currentProvider = currentProvider; }
    }

    private Object toControllerValidationRequest(ValidationRequest req) throws Exception {
        Class<?> controllerClass = validationController.getClass();
        Class<?>[] classes = controllerClass.getDeclaredClasses();
        Class<?> innerValidationRequestClass = null;

        for (Class<?> c : classes) {
            if (c.getSimpleName().equals("ValidationRequest")) {
                innerValidationRequestClass = c;
                break;
            }
        }
        if (innerValidationRequestClass == null) {
            throw new IllegalStateException("ValidationRequest inner class not found in ValidationController");
        }

        Object controllerReq = innerValidationRequestClass.getDeclaredConstructor().newInstance();

        innerValidationRequestClass.getMethod("setMsisdn", Long.class).invoke(controllerReq, req.getMsisdn());
        innerValidationRequestClass.getMethod("setImsi", Long.class).invoke(controllerReq, req.getImsi());
        innerValidationRequestClass.getMethod("setIdType", String.class).invoke(controllerReq, req.getIdType());
        innerValidationRequestClass.getMethod("setIdNumber", String.class).invoke(controllerReq, req.getIdNumber());
        innerValidationRequestClass.getMethod("setCurrentProvider", Integer.class).invoke(controllerReq, req.getCurrentProvider());

        return controllerReq;
    }

    // Use reflection to invoke validateSubscriber method
    private ResponseEntity<String> invokeValidateSubscriber(Object controllerReq) throws Exception {
        Method method = validationController.getClass()
                .getDeclaredMethod("validateSubscriber", controllerReq.getClass());
        return (ResponseEntity<String>) method.invoke(validationController, controllerReq);
    }

    @Test
    void testValidateSubscriber_valid() throws Exception {
        ValidationRequest req = new ValidationRequest();
        req.setMsisdn(1234567890L);
        req.setImsi(9876543210L);
        req.setIdType("Aadhar");
        req.setIdNumber("1234-5678-9012");
        req.setCurrentProvider(1);

        when(validationService.validateSubscriber(anyLong(), anyLong(), anyString(), anyString(), anyInt()))
                .thenReturn(true);

        Object controllerReq = toControllerValidationRequest(req);

        ResponseEntity<String> response = invokeValidateSubscriber(controllerReq);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Valid Subscriber", response.getBody());

        verify(validationService, times(1)).validateSubscriber(
                req.getMsisdn(), req.getImsi(), req.getIdType(), req.getIdNumber(), req.getCurrentProvider());
    }

    @Test
    void testValidateSubscriber_invalid() throws Exception {
        ValidationRequest req = new ValidationRequest();
        req.setMsisdn(1234567890L);
        req.setImsi(9999999999L);
        req.setIdType("Aadhar");
        req.setIdNumber("wrong-id");
        req.setCurrentProvider(1);

        when(validationService.validateSubscriber(anyLong(), anyLong(), anyString(), anyString(), anyInt()))
                .thenReturn(false);

        Object controllerReq = toControllerValidationRequest(req);

        ResponseEntity<String> response = invokeValidateSubscriber(controllerReq);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Invalid Subscriber", response.getBody());

        verify(validationService, times(1)).validateSubscriber(
                req.getMsisdn(), req.getImsi(), req.getIdType(), req.getIdNumber(), req.getCurrentProvider());
    }

}
