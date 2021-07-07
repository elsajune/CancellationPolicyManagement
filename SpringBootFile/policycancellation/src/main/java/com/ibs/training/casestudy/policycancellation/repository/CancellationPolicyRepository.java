package com.ibs.training.casestudy.policycancellation.repository;

import com.ibs.training.casestudy.policycancellation.models.CancellationPolicy;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CancellationPolicyRepository extends JpaRepository<CancellationPolicy, Long> {
}
