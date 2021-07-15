package com.ibs.training.casestudy.policycancellation.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

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
    private String policyUpdatedBy;

    @Column(name = "UPDATED_ON")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
   // @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime policyUpdatedOn;

    @OneToMany(mappedBy = "policy" , fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
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

    public String getPolicyUpdatedBy() {
        return policyUpdatedBy;
    }

    public void setPolicyUpdatedBy(String policyUpdatedBy) {
        this.policyUpdatedBy = policyUpdatedBy;
    }

    public LocalDateTime getPolicyUpdatedOn() {
        return policyUpdatedOn;
    }

    public void setPolicyUpdatedOn(LocalDateTime policyUpdateOn) {
        this.policyUpdatedOn = policyUpdatedOn;
    }

    public List<ExpediaRules> getRules() {
        return rules;
    }

    public void setRules(List<ExpediaRules> rules) {
        this.rules = rules;
    }
}
