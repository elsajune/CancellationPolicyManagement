package com.ibs.training.casestudy.policycancellation.controllers;

import com.ibs.training.casestudy.policycancellation.models.CancellationPolicy;
import com.ibs.training.casestudy.policycancellation.services.PolicyCancellationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CancellationPolicyController {

    @Autowired
    PolicyCancellationServiceImpl policyCancellationServiceImpl;

    @PostMapping("/cancellationpolicies")
    public ResponseEntity<CancellationPolicy> addCancellationPolicy(@RequestBody CancellationPolicy newPolicy) {
        try {
            CancellationPolicy addedPolicy = policyCancellationServiceImpl.addCancellationPolicy(newPolicy);
            return new ResponseEntity<>(addedPolicy, HttpStatus.CREATED);
        } catch (Exception exception) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/cancellationpolicies")
    public ResponseEntity<List<CancellationPolicy>> getAllCancellationPolicies(@RequestParam(required = false) String title) {
        try {
            List<CancellationPolicy> policies = policyCancellationServiceImpl.retrievePolicies();
            if (policies.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(policies, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/cancellationpolicies/{id}")
    public ResponseEntity<CancellationPolicy> updateCancellationPolicy(@PathVariable("id") long policyId, @RequestBody CancellationPolicy editedPolicy) {
        try {
            Optional<CancellationPolicy> policy = policyCancellationServiceImpl.updatePolicy(policyId, editedPolicy);
            if (policy.isPresent()) {
                CancellationPolicy updatedPolicy = policy.get();
                return new ResponseEntity<>(updatedPolicy, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/cancellationpolicies/{id}")
    public ResponseEntity<HttpStatus> deleteCancellationPolicy(@PathVariable("id") long policyId) {
        try {
            policyCancellationServiceImpl.deletePolicy(policyId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
