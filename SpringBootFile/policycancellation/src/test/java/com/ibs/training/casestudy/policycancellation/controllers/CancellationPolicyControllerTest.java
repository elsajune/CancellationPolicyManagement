package com.ibs.training.casestudy.policycancellation.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ibs.training.casestudy.policycancellation.models.CancellationPolicy;
import com.ibs.training.casestudy.policycancellation.models.ExpediaRules;
import com.ibs.training.casestudy.policycancellation.services.PolicyCancellationServiceImpl;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class CancellationPolicyControllerTest {
    @Mock
    private PolicyCancellationServiceImpl policyCancellationServiceImpl;
    private CancellationPolicy cancellationPolicy;
    private List<ExpediaRules> rules;
    List<CancellationPolicy> cancellationPolicyList;

    @InjectMocks
    CancellationPolicyController cancellationPolicyController;

    @Autowired
    private MockMvc mockMvc;


    @BeforeEach
    void setUp(){
        rules = new ArrayList<>();

        cancellationPolicy = new CancellationPolicy(1, "TestName", "TestDescription",
                "Expedia", 5, 5,
                "Tester", null);
        rules.add(new ExpediaRules(1, 0, 12, "amount", 200, "USD", "NO", cancellationPolicy));
        rules.add(new ExpediaRules(2, 6, 18, "amount", 100, "USD", "NO", cancellationPolicy));
        cancellationPolicy.setRules(rules);

        mockMvc = MockMvcBuilders.standaloneSetup(cancellationPolicyController).build();

    }

    @Test
    //Test Case to Post a Policy
    public void postMappingOfPolicy() throws Exception {
        when(policyCancellationServiceImpl.addCancellationPolicy(any())).thenReturn(cancellationPolicy);
        mockMvc.perform(post("/api/cancellationpolicies").
                contentType(MediaType.APPLICATION_JSON).
                content(asJsonString(cancellationPolicy))).
                andExpect(status().isCreated());
        verify(policyCancellationServiceImpl,times(1)).addCancellationPolicy(any());
    }
    static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Test Case to Retrieve all Poicies
    @Test
    public void getMappingPolicies() throws Exception {
        when(policyCancellationServiceImpl.retrievePolicies()).thenReturn(cancellationPolicyList);
        mockMvc.perform(get("/api/cancellationpolicies")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(cancellationPolicy)))
                .andDo(MockMvcResultHandlers.print());
        verify(policyCancellationServiceImpl,times(1)).retrievePolicies();
    }


    @Test
    //Test Case to Delete a Product
    public void deleteMappingPolicy() throws Exception {
        doNothing().when(policyCancellationServiceImpl).deletePolicy(cancellationPolicy.getPolicyId());
        mockMvc.perform(delete("/api/cancellationpolicies/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(cancellationPolicy)))
                .andExpect(status().isNoContent()).
                andDo(MockMvcResultHandlers.print());
    }



    @AfterEach
    void tearDown(){
        cancellationPolicy = null;
        rules = null;
    }





}