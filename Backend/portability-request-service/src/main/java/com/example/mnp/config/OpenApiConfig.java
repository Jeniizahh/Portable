package com.example.mnp.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    OpenAPI api() {
    return new OpenAPI()
        .info(new Info().title("MNP Portability Microservice API")
            .description("API Documentation for portability request microservice.")
            .version("v1"))
        .externalDocs(new ExternalDocumentation().description("Docs"));
  }
}


