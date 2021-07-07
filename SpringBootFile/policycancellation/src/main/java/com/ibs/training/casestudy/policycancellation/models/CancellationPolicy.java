package com.ibs.training.casestudy.policycancellation.models;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "CANCELLATION_POLICIES")
public class CancellationPolicy {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "POLICY_ID")
    private long policyId;

    @Column(name = "POLICY_NAME")
    private String policyName;

    @Column(name = "POLICY_DESCRIPTION")
    private String policyDescription;

    @Column(name = "POLICY_SOURCE")
    private String policySource;

    @Column(name = "CANCEL_RESTRICTION_DAYS")
    private int policyCancelRestrictionDays;

    @Column(name = "CANCEL_RESTRICTION_HOURS")
    private int policyCancelRestrictionHours;

    @Column(name = "UPDATED_BY")
    private String policyUpdateBy;

    @Column(name = "UPDATED_ON")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime policyUpdateOn;

    @OneToMany(mappedBy = "policy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ExpediaRules> rules;

    public long getPolicyId() {
        return policyId;
    }

    public void setPolicyId(long policyId) {
        this.policyId = policyId;
    }

    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }

    public String getPolicyDescription() {
        return policyDescription;
    }

    public void setPolicyDescription(String policyDescription) {
        this.policyDescription = policyDescription;
    }

    public String getPolicySource() {
        return policySource;
    }

    public void setPolicySource(String policySource) {
        this.policySource = policySource;
    }

    public int getPolicyCancelRestrictionDays() {
        return policyCancelRestrictionDays;
    }

    public void setPolicyCancelRestrictionDays(int policyCancelRestrictionDays) {
        this.policyCancelRestrictionDays = policyCancelRestrictionDays;
    }

    public int getPolicyCancelRestrictionHours() {
        return policyCancelRestrictionHours;
    }

    public void setPolicyCancelRestrictionHours(int policyCancelRestrictionHours) {
        this.policyCancelRestrictionHours = policyCancelRestrictionHours;
    }

    public String getPolicyUpdateBy() {
        return policyUpdateBy;
    }

    public void setPolicyUpdateBy(String policyUpdateBy) {
        this.policyUpdateBy = policyUpdateBy;
    }

    public LocalDateTime getPolicyUpdateOn() {
        return policyUpdateOn;
    }

    public void setPolicyUpdateOn(LocalDateTime policyUpdateOn) {
        this.policyUpdateOn = policyUpdateOn;
    }

    public List<ExpediaRules> getRules() {
        return rules;
    }

    public void setRules(List<ExpediaRules> rules) {
        this.rules = rules;
    }
}
