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
    @Column(name = "Policy_ID")
    private long policyId;

    @Column(name = "Policy_Name")
    private String policyName;

    @Column(name = "Policy_Description")
    private String policyDescription;

    @Column(name = "Policy_Source")
    private String policySource;

    @Column(name = "Cancel_RestrictionDays")
    private int policyCancelRestrictionDays;

    @Column(name = "Cancel_RestrictionHours")
    private int policyCancelRestrictionHours;

    @Column(name = "Updated_By")
    private String policyUpdateBy;

    @Column(name = "Updated_On")
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
