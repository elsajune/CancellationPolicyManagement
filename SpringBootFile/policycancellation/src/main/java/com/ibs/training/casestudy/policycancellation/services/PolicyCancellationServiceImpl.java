package com.ibs.training.casestudy.policycancellation.services;

import com.ibs.training.casestudy.policycancellation.models.CancellationPolicy;
import com.ibs.training.casestudy.policycancellation.models.ExpediaRules;
import com.ibs.training.casestudy.policycancellation.repository.CancellationPolicyRepository;
import com.ibs.training.casestudy.policycancellation.repository.ExpediaRuleRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PolicyCancellationServiceImpl {
    @Autowired
    CancellationPolicyRepository cancellationPolicyRepository;

    @Autowired
    ExpediaRuleRepository expediaRuleRepository;

    public CancellationPolicy addCancellationPolicy(CancellationPolicy newPolicy) throws Exception {
        List<ExpediaRules> expediaRules = newPolicy.getRules();
        expediaRules.forEach((rule) -> {
            rule.setPolicy(newPolicy);
        });
        newPolicy.setRules(expediaRules);
        newPolicy.setPolicyUpdatedOn(LocalDateTime.now());
        CancellationPolicy addedPolicy = cancellationPolicyRepository.save(newPolicy);
        return addedPolicy;
    }

    public List<CancellationPolicy> retrievePolicies() throws Exception {
        List<CancellationPolicy> policies = new ArrayList<CancellationPolicy>();
        cancellationPolicyRepository.findAll().forEach(policies::add);
        return policies;
    }

    public Optional<CancellationPolicy> updatePolicy(long policyId, CancellationPolicy editedPolicy) {
        Optional<CancellationPolicy> updatedPolicy = cancellationPolicyRepository.findById(policyId).map((selectedPolicy) -> {
            selectedPolicy.getRules().clear();
            selectedPolicy.getRules().addAll(editedPolicy.getRules());
            selectedPolicy.getRules().forEach((rule) -> {
                rule.setPolicy(editedPolicy);
            });
            selectedPolicy.setPolicyId(editedPolicy.getPolicyId());
            selectedPolicy.setPolicyName(editedPolicy.getPolicyName());
            selectedPolicy.setPolicySource(editedPolicy.getPolicySource());
            selectedPolicy.setPolicyDescription(editedPolicy.getPolicyDescription());
            selectedPolicy.setPolicyUpdatedBy(editedPolicy.getPolicyUpdatedBy());
            selectedPolicy.setPolicyUpdatedOn(LocalDateTime.now());
            selectedPolicy.setPolicyCancelRestrictionDays(editedPolicy.getPolicyCancelRestrictionDays());
            selectedPolicy.setPolicyCancelRestrictionHours(editedPolicy.getPolicyCancelRestrictionHours());
            return cancellationPolicyRepository.save(selectedPolicy);
        });
        return updatedPolicy;
    }

    public void deletePolicy(long policyId) throws Exception {
        cancellationPolicyRepository.deleteById(policyId);
    }
}
