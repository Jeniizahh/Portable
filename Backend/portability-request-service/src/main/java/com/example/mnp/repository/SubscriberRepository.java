package com.example.mnp.repository;

import com.example.mnp.model.Subscriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {
	@Query(value = "SELECT * FROM subscriber WHERE msisdn::bigint = :msisdn", nativeQuery = true)
	Subscriber findByMsisdn(Long msisdn);
}
