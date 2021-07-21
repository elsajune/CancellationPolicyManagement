package com.ibs.training.casestudy.policycancellation.services;

import com.ibs.training.casestudy.policycancellation.models.CancellationPolicy;
import com.ibs.training.casestudy.policycancellation.models.ExpediaRules;
import com.ibs.training.casestudy.policycancellation.repository.CancellationPolicyRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class PolicyCancellationServiceImplTestVtwo {

    @Mock
    private CancellationPolicyRepository cancellationPolicyRepository;

    @Autowired
    @InjectMocks
    private PolicyCancellationServiceImpl policyCancellationServiceImpl;
    private CancellationPolicy cancellationPolicyA;
    private CancellationPolicy cancellationPolicyB;
    private List<ExpediaRules> rules;
    List<CancellationPolicy> cancellationPolicyList;

    @BeforeEach
    public void setUp() {
        cancellationPolicyList = new ArrayList<>();
        rules = new ArrayList<>();

        cancellationPolicyA = new CancellationPolicy(1, "TestName", "TestDescription",
                "Expedia", 5, 5,
                "Tester", null);
        rules.add(new ExpediaRules(1, 0, 12, "amount", 200, "USD", "NO", cancellationPolicyA));
        rules.add(new ExpediaRules(2, 6, 18, "amount", 100, "USD", "NO", cancellationPolicyA));
        cancellationPolicyA.setRules(rules);

        cancellationPolicyList.add(cancellationPolicyA);

        cancellationPolicyB = new CancellationPolicy(5, "TestNameB", "TestDescriptionB",
                "Expedia", 5, 5,
                "Tester", null);
        rules.clear();
        rules.add(new ExpediaRules(3, 0, 12, "amount", 200, "USD", "NO", cancellationPolicyB));
        rules.add(new ExpediaRules(4, 6, 18, "amount", 100, "USD", "NO", cancellationPolicyB));
        cancellationPolicyB.setRules(rules);

        cancellationPolicyList.add(cancellationPolicyB);
    }

    @Test
    //Test Case for Saving a Policy
    public void givenPolicyToAddShouldReturnAddedPolicy() throws Exception{



    }



    @AfterEach
    public void tearDown() {
        cancellationPolicyA = cancellationPolicyB = null;
        cancellationPolicyList = null;
        rules = null;
    }

}