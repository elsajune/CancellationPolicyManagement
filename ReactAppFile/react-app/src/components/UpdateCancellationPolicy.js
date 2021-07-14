import { Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCancellationPolicy } from "../actions/actioncreator";
import RuleList from "./RuleList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

const UpdateCancellationPolicy = (props) => {
    const intialPolicyState = JSON.parse(JSON.stringify(props.policy));

    const intialRuleState = {
        ruleId: 0,
        offSetDays: 0,
        offSetHours: 0,
        feeBasis: "amount",
        value: 0,
        curreny: "USD",
        noShow: "YES",
        key: Date.now()

    };

    const [rule, setRule] = useState(intialRuleState);
    const [policy, setPolicy] = useState(intialPolicyState);
    const [updatedPolicy, setUpdatedPolicy] = useState(false);
    const [showRule, setShowRule] = useState(false);

    //To dispatch action to the store
    const dispatch = useDispatch();


    //handle change in the input and update the rule
    const createRule = (event) => {
        event.preventDefault();
        const newRule = { ...rule };
        const newRules = [...policy.rules, newRule];
        setPolicy({ ...policy, rules: newRules });
        setRule(intialRuleState);
    }

    const handleRuleChange = event => {
        const { name, value } = event.target;
        setRule({ ...rule, [name]: value, key: Date.now() });
        const newRule = { ...rule };
        const newRules = [...policy.rules, newRule];
        //Check this setPolicy again
        setPolicy({ ...policy, rules: newRules });
    };

    const deleteRule = (key) => {
        const filteredRules = policy.rules.filter(item =>
            item.key !== key);
        setPolicy({
            ...policy, rules: filteredRules
        })
    }

    const updateRule = (rule, key) => {
        console.log("Rules:" + policy.rules);
        const updateRules = { ...policy.rules }
        updateRules.map(item => {
            if (item.key === key) {
                    item.id = rule.id,
                    item.offSetDays = rule.offSetDays,
                    item.offSetHours = rule.offSetHours,
                    item.feeBasis = "amount",
                    item.value = rule.value,
                    item.curreny = rule.curreny,
                    item.noShow = rule.noShow
            }
        })
        //Check this setting of policy's rules
        setPolicy({...policy,rules:updateRules})
    };
    //handle change in the input and update the policy 

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPolicy({ ...policy, [name]: value });
    };

    const handlePolicySource = event => {
        const { value } = event.target;
        if (value === "expedia") {
            setShowRule(true);
        } else {
            setShowRule(false);
            setPolicy({
                ...policy, rules: []
            })
        }
    };

    const saveCancellationPolicy = (event) => {
        //Value added to the DB and the policy that was returned in the response is used to setPolicy
        event.preventDefault();
        policy.rules.map(rule => delete rule.key);
        console.log(policy);
        console.log(policy.rule)
        dispatch(createCancellationPolicy(policy)).then(data => {
            setPolicy(JSON.parse(JSON.stringify(data)));
            setAddedPolicy(true);
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    };

    const newCancellationPolicy = () => {
        setPolicy(intialPolicyState);
        setAddedPolicy(false);
        setRule(intialRuleState);
    };

    return (

        <div>
            <div className="alert alert-primary" role="alert">
                Add Car Rental Cancellation Policy
            </div>
            {/* Option to submit new Policy once the current Policy successfully added*/}
            {addedPolicy && (
                <div className="alert alert-success" role="alert">
                    You submitted successfully!
                    <button type="button" className="btn btn-primary btn-sm float-end" onClick={newCancellationPolicy}> Add New Policy</button>
                </div>)}

            {/*Add Policy Form (including ruleset for the Expedia policy Source*/}
            <form className="d-grid gap-3">
                <Card bg="light">
                    <Card.Body>
                        <div className="container">
                            <div className="row row-cols-2">

                                <div className="col">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="policyName"
                                            required
                                            value={policy.policyName}
                                            onChange={handleInputChange}
                                            name="policyName"
                                        />
                                        <label htmlFor="policyName">Policy Name</label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="policyDescription"
                                            required
                                            value={policy.policyDescription}
                                            onChange={handleInputChange}
                                            name="policyDescription"
                                        />
                                        <label htmlFor="policyDescription">Policy Description</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                {/*Policy source and related forms*/}
                <div className="card ">
                    <div className="card-body d-grid gap-3">
                        <h6 className="card-subtitle mb-2 text-muted">Policy Value</h6>
                        <div className="container">
                            <div className="row ">
                                <div className="col-auto">
                                    <div className="form-floating selectpicker">
                                        <select className="form-select" id="policySource" name="policySource" onChange={handlePolicySource}>
                                            <option value=" ">Select Source</option>
                                            <option value="expedia">Expedia</option>
                                            <option value="provider">Provider</option>
                                        </select>
                                        <label htmlFor="policySource">Policy Source</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Ruleset for the Expedia Policy Proivder*/}
                        {showRule && (

                            <div className="d-grid gap-3" >
                                {/*List of Rules diplayed*/}
                                <RuleList rules={policy.rules} deleteRule={deleteRule} updateRule={updateRule} />

                                {/*Adding Rule for Expedia*/}
                                <div className="container">
                                    <div>
                                        <div className="row row-cols-6 justify-content-center h-100 v-100">
                                            <div className="col">
                                                <div className="form-floating">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="offSetDays"
                                                        required
                                                        min="0"
                                                        value={rule.offSetDays}
                                                        onChange={handleRuleChange}
                                                        name="offSetDays"
                                                    />
                                                    <label htmlFor="offSetDays">Offset Days</label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-floating">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="offSetHours"
                                                        required
                                                        min="0"
                                                        value={rule.offSetHours}
                                                        onChange={handleRuleChange}
                                                        name="offSetHours"
                                                    />
                                                    <label htmlFor="offSetHours">Offset Hours</label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-floating">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="value"
                                                        required
                                                        min="0"
                                                        value={rule.value}
                                                        onChange={handleRuleChange}
                                                        name="value"
                                                    />
                                                    <label htmlFor="value">Value</label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-floating selectpicker">
                                                    <select className="form-select" id="curreny" name="curreny" onChange={handleRuleChange}>
                                                        {/*selected changed to value = ""*/}
                                                        <option value="">Select</option>
                                                        <option value="USD">USD</option>
                                                        <option value="INR">INR</option>
                                                    </select>
                                                    <label htmlFor="curreny">Curreny</label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-floating selectpicker">
                                                    <select className="form-select" id="noShow" name="noShow" onChange={handleRuleChange}>
                                                        <option value="">Select</option>
                                                        <option value="NO">NO</option>
                                                        <option value="YES">YES</option>
                                                    </select>
                                                    <label htmlFor="noShow">No Show:</label>
                                                </div>
                                            </div>
                                            <div className="col-md-auto my-auto">
                                                <FontAwesomeIcon onClick={deleteRule} icon={faTrash} />
                                            </div>
                                        </div>
                                        <div className="row row-cols-1">
                                            <div className="col">
                                                <button className="btn btn-primary btn-sm float-end" onClick={createRule}>+Add Rule</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/*End of the Ruleset for Expedia */}

                {/*Restrictions*/}
                <div className="card">
                    <div className="card-body container">
                        <h6 className="card-subtitle mb-2 text-muted">Restrictions</h6>

                        <div className="row">
                            <div className="col-auto">
                                Stop Cancel Before :
                            </div>
                            <div className="col-auto">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="policyCancelRestrictionDays"
                                        required
                                        min="0"
                                        value={policy.policyCancelRestrictionDays}
                                        onChange={handleInputChange}
                                        name="policyCancelRestrictionDays"
                                    />
                                    <label htmlFor="policyCancelRestrictionDays">Days</label>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="policyCancelRestrictionHours"
                                        required
                                        min="0"
                                        max="23"
                                        value={policy.policyCancelRestrictionHours}
                                        onChange={handleInputChange}
                                        name="policyCancelRestrictionHours"
                                    />
                                    <label htmlFor="policyCancelRestrictionHours">Hours</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row row-cols-1">
                    <div className="col">
                        <button onClick={saveCancellationPolicy} className="btn btn-primary btn-sm float-end ">
                            Add Policy  </button>
                    </div>
                </div>
            </form>

        </div >);
}
export default AddCancellationPolicy;