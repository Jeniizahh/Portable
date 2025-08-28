package com.example.mnp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.mnp.model.*;
public interface PortRequestRepository extends JpaRepository<PortRequest, Long> {
}
