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
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

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
    public void givenPolicyToAddShouldReturnAddedPolicy() throws Exception {

        when(cancellationPolicyRepository.save(any())).thenReturn(cancellationPolicyA);
        policyCancellationServiceImpl.addCancellationPolicy(cancellationPolicyA);
        verify(cancellationPolicyRepository, times(1)).save(any());

    }

    @Test
    //Test Code for Retrieval of all Policies
    public void givenGetAllPoliciesShouldReturnListOfPolicies() throws Exception {
        cancellationPolicyRepository.save(cancellationPolicyA);
        when(cancellationPolicyRepository.findAll()).thenReturn(cancellationPolicyList);
        List<CancellationPolicy> fetchedPoliciesList = policyCancellationServiceImpl.retrievePolicies();
        assertEquals(fetchedPoliciesList, cancellationPolicyList);
        verify(cancellationPolicyRepository, times(1)).save(any());
        verify(cancellationPolicyRepository, times(1)).findAll();
    }

   /*  @Test
    //Test Code for Retrieval of Policy of Given ID
   public void givenIdShouldReturnPolicyOfTheID(){
    when(cancellationPolicyRepository.findById(1).thenReturn(Optional.ofNullable(cancellationPolicyA)));
    assertThat(productService.getProductByid(product1.getId())).isEqualTo(product1);
    assertThat()
    }*/

    /*@Test
    //Test Case to Delete a Policy by Id
    public void givenIdShouldDeletePolicyOfThatId() throws Exception {
        doNothing().when(cancellationPolicyRepository).deleteById(cancellationPolicyA.getPolicyId());
        verify(cancellationPolicyRepository,times(1)).findAll();
    }*/


    @AfterEach
    public void tearDown() {
        cancellationPolicyA = cancellationPolicyB = null;
        cancellationPolicyList = null;
        rules = null;
    }

}