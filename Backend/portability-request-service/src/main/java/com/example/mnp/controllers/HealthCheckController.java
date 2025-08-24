package com.example.mnp.controllers;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.apache.hc.core5.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
	public class HealthCheckController {

	    private final DataSource dataSource;

	    @Autowired
	    public HealthCheckController(DataSource dataSource) {
	        this.dataSource = dataSource;
	    }

	    @GetMapping("/dbtest")
	    public ResponseEntity<String> testDatabaseConnection() {
	        try (Connection conn = dataSource.getConnection()) {
	            if (conn.isValid(2)) {
	                return ResponseEntity.ok("Database is connected");
	            } else {
	                return ResponseEntity.status(HttpStatus.SC_SERVICE_UNAVAILABLE).body("Database connection is invalid");
	            }
	        } catch (SQLException e) {
	            return ResponseEntity.status(HttpStatus.SC_SERVICE_UNAVAILABLE).body("Database connection failed: " + e.getMessage());
	        }
	    }
	}

