package com.mnptracker.trigger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
@EnableDiscoveryClient
@SpringBootApplication
public class TriggerProviderApplication {

	public static void main(String[] args) {
		SpringApplication.run(TriggerProviderApplication.class, args);
	}

}
