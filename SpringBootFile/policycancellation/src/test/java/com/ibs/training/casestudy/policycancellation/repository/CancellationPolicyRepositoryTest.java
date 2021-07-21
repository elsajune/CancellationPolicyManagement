package com.ibs.training.casestudy.policycancellation.repository;

import com.ibs.training.casestudy.policycancellation.models.CancellationPolicy;
import com.ibs.training.casestudy.policycancellation.models.ExpediaRules;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE) //Deprecated look for other methods
class CancellationPolicyRepositoryTest {
    @Autowired
    private CancellationPolicyRepository cancellationPolicyRepository;
    private CancellationPolicy cancellationPolicy;
    private List<ExpediaRules> rules = new ArrayList<>();


    @BeforeEach
    void setUp() {
        cancellationPolicy = new CancellationPolicy(1, "TestName", "TestDescription",
                "Expedia", 5, 5,
                "Tester", null);
        rules.add(new ExpediaRules(1, 0, 12, "amount", 200, "USD", "NO", cancellationPolicy));
        rules.add(new ExpediaRules(2, 6, 18, "amount", 100, "USD", "NO", cancellationPolicy));
        cancellationPolicy.setRules(rules);
    }

    @Test
    //Test Case for Saving a Policy
    public void givenPolicyToAddShouldReturnAddedPolicy() {
        cancellationPolicyRepository.save(cancellationPolicy);
        CancellationPolicy fetchedPolicy = cancellationPolicyRepository.findById(cancellationPolicy.getPolicyId()).get();//Learn .get used
        assertEquals(1, fetchedPolicy.getPolicyId());
    }

    @Test
    //Test Case for getting all Policies
    public void givenGetAllPolicesShouldReturnListofPolicies() {
        CancellationPolicy cancellationPolicyA = new CancellationPolicy(2, "TestName", "TestDescription",
                "Expedia", 5, 5,
                "Tester", null);
        List<ExpediaRules> rulesTest = new ArrayList<>();
        rulesTest.add(new ExpediaRules(11, 0, 12, "amount", 200, "USD", "NO", cancellationPolicyA));
        rulesTest.add(new ExpediaRules(12, 6, 18, "amount", 100, "USD", "NO", cancellationPolicyA));
        cancellationPolicyA.setRules(rulesTest);

        CancellationPolicy cancellationPolicyB = new CancellationPolicy(5, "TestNameB", "TestDescriptionB",
                "Expedia", 5, 5,
                "Tester", null);
        rulesTest.clear();
        rulesTest.add(new ExpediaRules(3, 0, 12, "amount", 200, "USD", "NO", cancellationPolicyB));
        rulesTest.add(new ExpediaRules(4, 6, 18, "amount", 100, "USD", "NO", cancellationPolicyB));
        cancellationPolicyB.setRules(rulesTest);

        cancellationPolicyRepository.save(cancellationPolicyA);
        cancellationPolicyRepository.save(cancellationPolicyB);

        List<CancellationPolicy> cancellationPolicies = (List<CancellationPolicy>) cancellationPolicyRepository.findAll(); //TODO Check again
        cancellationPolicies.size();
        assertEquals("TestNameB", cancellationPolicies.get(cancellationPolicies.size() - 1).getPolicyName());

    }

    @Test
    //Test Case to Retrieve Policy by Id
    public void givenIdShouldReturnPolicyOfThatId() {
        CancellationPolicy cancellationPolicyA = new CancellationPolicy(4, "TestName", "TestDescription",
                "Expedia", 5, 5,
                "Tester", null);
        List<ExpediaRules> rulesTest = new ArrayList<>();
        rulesTest.add(new ExpediaRules(5, 0, 12, "amount", 200, "USD", "NO", cancellationPolicyA));
        rulesTest.add(new ExpediaRules(6, 6, 18, "amount", 100, "USD", "NO", cancellationPolicyA));
        cancellationPolicyA.setRules(rules);

        CancellationPolicy cancellationPolicyB = cancellationPolicyRepository.save(cancellationPolicyA);
        Optional<CancellationPolicy> optionalPolicy = cancellationPolicyRepository.findById(cancellationPolicyB.getPolicyId());
        assertEquals(cancellationPolicyB.getPolicyId(), optionalPolicy.get().getPolicyId());
        assertEquals(cancellationPolicyB.getPolicyName(), optionalPolicy.get().getPolicyName());
    }

    @Test
    //Test Case to Delete a Policy by Id
    public void givenIdShouldDeletePolicy(){
        CancellationPolicy cancellationPolicyA = new CancellationPolicy(4, "TestName", "TestDescription",
                "Expedia", 5, 5,
                "Tester", null);
        List<ExpediaRules> rulesTest = new ArrayList<>();
        rulesTest.add(new ExpediaRules(5, 0, 12, "amount", 200, "USD", "NO", cancellationPolicyA));
        rulesTest.add(new ExpediaRules(6, 6, 18, "amount", 100, "USD", "NO", cancellationPolicyA));
        cancellationPolicyA.setRules(rulesTest);

        CancellationPolicy cancellationPolicyB = cancellationPolicyRepository.save(cancellationPolicyA);
        cancellationPolicyRepository.deleteById(cancellationPolicyB.getPolicyId());
        Optional<CancellationPolicy> optionalPolicy = cancellationPolicyRepository.findById(cancellationPolicyB.getPolicyId());
        assertEquals(Optional.empty(),optionalPolicy);

    }


    @AfterEach
    void tearDown() {
        cancellationPolicyRepository.deleteAll();
        cancellationPolicy = null;
        rules.clear();
    }
}