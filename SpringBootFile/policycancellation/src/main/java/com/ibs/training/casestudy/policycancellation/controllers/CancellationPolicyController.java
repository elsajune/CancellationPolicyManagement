package com.ibs.training.casestudy.policycancellation.controllers;

import com.ibs.training.casestudy.policycancellation.models.CancellationPolicy;
import com.ibs.training.casestudy.policycancellation.models.ExpediaRules;
import com.ibs.training.casestudy.policycancellation.repository.CancellationPolicyRepository;
import com.ibs.training.casestudy.policycancellation.repository.ExpediaRuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CancellationPolicyController {
    @Autowired
    CancellationPolicyRepository cancellationPolicyRepository;

    @Autowired
    ExpediaRuleRepository expediaRuleRepository;

    @PostMapping("/cancellationpolicies")
    //Add new Cancellation Policy (Learn more about ResponseEntity)
    public ResponseEntity<CancellationPolicy> addCancellationPolicy(@RequestBody CancellationPolicy newPolicy) {
        try {
            List<ExpediaRules> expediaRules = newPolicy.getRules();
            expediaRules.forEach((rule) ->{
                rule.setPolicy(newPolicy);
            });
            newPolicy.setRules(expediaRules);
            newPolicy.setPolicyUpdatedOn(LocalDateTime.now());
            CancellationPolicy addedPolicy = cancellationPolicyRepository.save(newPolicy);

            return new ResponseEntity<>(addedPolicy, HttpStatus.CREATED);
        } catch (Exception exception) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/cancellationpolicies")
    public ResponseEntity<List<CancellationPolicy>> getAllCancellationPolicies(@RequestParam(required = false) String title) {
        try {
            List<CancellationPolicy> policies = new ArrayList<CancellationPolicy>();
            cancellationPolicyRepository.findAll().forEach(policies::add);
            if (policies.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(policies, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/cancellationpolicies/{id}")
    public ResponseEntity<CancellationPolicy> getAllCancellationPolicyById(@PathVariable("id") long policyId) {
        Optional<CancellationPolicy> policy = cancellationPolicyRepository.findById(policyId);
        if (policy.isPresent()) {
            return new ResponseEntity<>(policy.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/cancellationpolicies/{id}")
    public ResponseEntity<CancellationPolicy> updateCancellationPolicy(@PathVariable("id") long policyId, @RequestBody CancellationPolicy updatesPolicy) {
        Optional<CancellationPolicy> policy = cancellationPolicyRepository.findById(policyId).map((selectedPolicy) ->{
            selectedPolicy.setPolicyId(updatesPolicy.getPolicyId());
            selectedPolicy.setPolicyName(updatesPolicy.getPolicyName());
            selectedPolicy.setPolicySource(updatesPolicy.getPolicySource());
            selectedPolicy.setPolicyDescription(updatesPolicy.getPolicyDescription());
            selectedPolicy.setPolicyUpdatedBy(updatesPolicy.getPolicyUpdatedBy());
            selectedPolicy.setPolicyUpdatedOn(LocalDateTime.now());
            selectedPolicy.setPolicyCancelRestrictionDays(updatesPolicy.getPolicyCancelRestrictionDays());
            selectedPolicy.setPolicyCancelRestrictionHours(updatesPolicy.getPolicyCancelRestrictionHours());
            selectedPolicy.getRules().clear();
            selectedPolicy.getRules().addAll(updatesPolicy.getRules());
            return cancellationPolicyRepository.save(selectedPolicy);
        });
        if (policy.isPresent()) {
            CancellationPolicy updatedPolicy = policy.get();
            return new ResponseEntity<>(updatedPolicy, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/cancellationpolicies/{id}")
    public ResponseEntity<HttpStatus> deleteCancellationPolicy(@PathVariable("id") long policyId) {
        try {
            cancellationPolicyRepository.deleteById(policyId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
