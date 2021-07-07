package com.ibs.training.casestudy.policycancellation.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name ="EXPEDIA_RULESET")
public class ExpediaRules {
    @Id
    @Column(name = "RULE_ID")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long ruleId;

    @Column(name = "OFFSET_HOURS")
    private int offsetHours;

    @Column(name = "OFFSET_DAYS")
    private int offsetDays;

    @Column(name = "FEE_BASIS")
    private String feeBasis;

    @Column(name = "VALUE")
    private int value;

    @Column(name = "CURRENCY")
    private String currency;

    @Column(name = "NO_SHOW")
    private boolean noShow;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "POLICY_ID", nullable = false)
    private CancellationPolicy policy;

    public long getRuleId() {
        return ruleId;
    }

    public void setRuleId(long ruleId) {
        this.ruleId = ruleId;
    }

    public int getOffsetHours() {
        return offsetHours;
    }

    public void setOffsetHours(int offsetHours) {
        this.offsetHours = offsetHours;
    }

    public int getOffsetDays() {
        return offsetDays;
    }

    public void setOffsetDays(int offsetDays) {
        this.offsetDays = offsetDays;
    }

    public String getFeeBasis() {
        return feeBasis;
    }

    public void setFeeBasis(String feeBasis) {
        this.feeBasis = feeBasis;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public boolean isNoShow() {
        return noShow;
    }

    public void setNoShow(boolean noShow) {
        this.noShow = noShow;
    }

    public CancellationPolicy getPolicy() {
        return policy;
    }

    public void setPolicy(CancellationPolicy policy) {
        this.policy = policy;
    }
}
