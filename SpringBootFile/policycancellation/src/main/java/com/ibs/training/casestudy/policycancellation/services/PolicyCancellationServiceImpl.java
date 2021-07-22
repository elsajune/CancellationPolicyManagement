package com.ibs.training.casestudy.policycancellation.services;

import com.ibs.training.casestudy.policycancellation.models.CancellationPolicy;
import com.ibs.training.casestudy.policycancellation.models.ExpediaRules;
import com.ibs.training.casestudy.policycancellation.repository.CancellationPolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PolicyCancellationServiceImpl implements PolicyCancellationService {
    @Autowired
    CancellationPolicyRepository cancellationPolicyRepository;


    public CancellationPolicy addCancellationPolicy(CancellationPolicy newPolicy) throws Exception {
        List<ExpediaRules> expediaRules = newPolicy.getRules();
        expediaRules.forEach((rule) -> {
                rule.setPolicy(newPolicy);
            });
        newPolicy.setRules(expediaRules);
        newPolicy.setPolicyUpdatedOn();
        newPolicy.setPolicyUpdatedBy("Tester");
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
            selectedPolicy.setPolicyUpdatedOn();
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
