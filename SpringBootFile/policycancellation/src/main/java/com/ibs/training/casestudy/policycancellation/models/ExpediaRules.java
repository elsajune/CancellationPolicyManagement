package com.ibs.training.casestudy.policycancellation.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name ="EXPEDIA_RULESET")
public class ExpediaRules{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "RULE_ID")
    private long ruleId;

    @Column(name = "OFFSET_HOURS")
    private int offSetHours;

    @Column(name = "OFFSET_DAYS")
    private int offSetDays;

    @Column(name = "FEE_BASIS")
    private String feeBasis;

    @Column(name = "VALUE")
    private int value;

    @Column(name = "CURRENCY")
    private String currency;

    @Column(name = "NO_SHOW")
    private String noShow;

    @ManyToOne(fetch = FetchType.LAZY , optional = false)
    @JoinColumn(name = "POLICY_ID" , nullable = false)
    @JsonIgnore
    private CancellationPolicy policy;

    public ExpediaRules(){
    }

    public ExpediaRules(long ruleId, int offSetHours, int offSetDays, String feeBasis, int value, String currency, String noShow, CancellationPolicy policy) {
        this.ruleId = ruleId;
        this.offSetHours = offSetHours;
        this.offSetDays = offSetDays;
        this.feeBasis = feeBasis;
        this.value = value;
        this.currency = currency;
        this.noShow = noShow;
        this.policy = policy;
    }

    public long getRuleId() {
        return ruleId;
    }

    public void setRuleId(long ruleId) {
        this.ruleId = ruleId;
    }

    public int getOffSetHours() {
        return offSetHours;
    }

    public void setOffSetHours(int offSetHours) {
        this.offSetHours = offSetHours;
    }

    public int getOffSetDays() {
        return offSetDays;
    }

    public void setOffSetDays(int offSetDays) {
        this.offSetDays = offSetDays;
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

    public String getNoShow() {
        return noShow;
    }

    public void setNoShow(String noShow) {
        this.noShow = noShow;
    }

    public CancellationPolicy getPolicy() {
        return policy;
    }

    public void setPolicy(CancellationPolicy policy) {
        this.policy = policy;
    }
}
