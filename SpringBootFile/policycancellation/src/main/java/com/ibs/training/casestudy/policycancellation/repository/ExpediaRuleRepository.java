package com.ibs.training.casestudy.policycancellation.repository;

import com.ibs.training.casestudy.policycancellation.models.ExpediaRules;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpediaRuleRepository extends JpaRepository<ExpediaRules, Long> {
}
