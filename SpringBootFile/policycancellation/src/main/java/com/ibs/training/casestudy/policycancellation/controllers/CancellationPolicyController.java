package com.ibs.training.casestudy.policycancellation.controllers;

import com.ibs.training.casestudy.policycancellation.models.CancellationPolicy;
import com.ibs.training.casestudy.policycancellation.repository.CancellationPolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8083")
@RestController
@RequestMapping("/api")
public class CancellationPolicyController {
    @Autowired
    CancellationPolicyRepository cancellationPolicyRepository;

    @PostMapping("/cancellationpolicies")
    //Add new Cancellation Policy (Learn more about ResponseEntity)
    public ResponseEntity<CancellationPolicy> addCancellationPolicy(@RequestBody CancellationPolicy newPolicy) {
        try {
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

}
