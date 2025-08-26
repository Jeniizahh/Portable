package com.example.mnp.controllers;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyCorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")                    // allow all paths
                        .allowedOrigins("http://localhost:3000") // your frontend origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // allowed methods
                        .allowedHeaders("*")                    // allow all headers
                        .allowCredentials(true);                // if using cookies/auth
            }
        };
    }
}

