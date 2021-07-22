package com.ibs.training.casestudy.policycancellation.services;

import com.ibs.training.casestudy.policycancellation.models.CancellationPolicy;
import com.ibs.training.casestudy.policycancellation.models.ExpediaRules;
import com.ibs.training.casestudy.policycancellation.repository.CancellationPolicyRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)//Change this
public class PolicyCancellationServiceImplTest {

    @Mock
    private CancellationPolicyRepository cancellationPolicyRepository;

    @InjectMocks
    private PolicyCancellationServiceImpl policyCancellationServiceImpl;


    @Test
    void whenSavePolicy_shouldReturnPolicy() throws Exception {
        CancellationPolicy policy = new CancellationPolicy();
        List<ExpediaRules> expediaRules = new ArrayList<>();
        expediaRules.add(new ExpediaRules());
        policy.setPolicyName("Test Name");
        policy.setRules(expediaRules);


        when(cancellationPolicyRepository.save(any(CancellationPolicy.class))).thenReturn(policy);
        CancellationPolicy createdPolicy = policyCancellationServiceImpl.addCancellationPolicy(policy);
        assertThat(createdPolicy.getPolicyName()).isSameAs(policy.getPolicyName());

        verify(cancellationPolicyRepository).save(policy);

    }

    @Test
    void shouldReturnAllPolicies() throws Exception {
        List<CancellationPolicy> policies = new ArrayList<CancellationPolicy>();
        policies.add(new CancellationPolicy());
        given(cancellationPolicyRepository.findAll()).willReturn(policies);
        List<CancellationPolicy> expectedPolicies = policyCancellationServiceImpl.retrievePolicies();
        assertEquals(expectedPolicies, policies);
        verify(cancellationPolicyRepository).findAll();
    }

    @Test
    void updatePolicy() {
    }

    @Test
    void whenGivenId_shouldDeletePolicy_ifFound() throws Exception {
        CancellationPolicy policy = new CancellationPolicy();
        policy.setPolicyName("Test Name");
        policy.setPolicyId(1);

        when(cancellationPolicyRepository.findById(policy.getPolicyId())).thenReturn(Optional.of(policy));
        policyCancellationServiceImpl.deletePolicy(policy.getPolicyId());
        verify(cancellationPolicyRepository).deleteById(policy.getPolicyId());
    }

}