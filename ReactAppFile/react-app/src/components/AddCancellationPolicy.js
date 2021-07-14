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

const AddCancellationPolicy = () => {
    const intialPolicyState = {
        policyId: 0,
        policyName: "Enter policy name",
        policyDescription: "Enter policy Descritpion",
        policySource: "",
        policyCancelRestrictionDays: 0,
        policyCancelRestrictionHours: 0,
        policyUpdateBy: "",
        policyUpdateOn: "",
        rules: []
    };

    const intialRuleState = {
        ruleId: 0,
        offSetDays: 0,
        offSetHours: 0,
        feeBasis: "amount",
        value: 0,
        currency: " ",
        noShow: " ",
        key: Date.now()

    };

    const [rule, setRule] = useState(intialRuleState);
    const [policy, setPolicy] = useState(intialPolicyState);
    const [addedPolicy, setAddedPolicy] = useState(false);
    const [showRule, setShowRule] = useState(false);

    //To dispatch action to the store
    const dispatch = useDispatch();


    /*handle functions for Expedia rules */
    const createRule = (event) => {
        event.preventDefault();
        const newRule = { ...rule };
        const newRules = [...policy.rules, newRule];
        setPolicy({ ...policy, rules: newRules });
        console.log("Rule created", newRules);
        setRule(intialRuleState);
    }

    const handleRuleChange = event => {
        const { name, value } = event.target;
        setRule({ ...rule, [name]: value, key: Date.now() });
    };

    const deleteRule = (key) => {
        const filteredRules = policy.rules.filter(item =>
            item.key !== key);
        setPolicy({
            ...policy, rules: filteredRules
        })
    }

    const resetRule = () => {
        setRule(intialRuleState);
    }

    const updateRule = (event, key) => {
        const { name, value } = event.target;
        const rules = JSON.parse(JSON.stringify(policy.rules));
        const updatedRules = rules.map(item => {
            var temp = Object.assign({}, item);
            if (temp.key === key) {
                return { ...temp, [name]: value }
            }
            return temp;
        });
        setPolicy({ ...policy, rules: updatedRules })
    }
    /* end handle functions for Expedia rules */


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
                                                    <select value={rule.currency} className="form-select" id="currency" name="currency" onChange={handleRuleChange}>
                                                        {/*selected changed to value = ""*/}
                                                        <option value=" ">Select</option>
                                                        <option value="USD">USD</option>
                                                        <option value="INR">INR</option>
                                                    </select>
                                                    <label htmlFor="currency">Currency</label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-floating selectpicker">
                                                    <select value={rule.noShow} className="form-select" id="noShow" name="noShow" onChange={handleRuleChange}>
                                                        <option value=" ">Select</option>
                                                        <option value="NO">NO</option>
                                                        <option value="YES">YES</option>
                                                    </select>
                                                    <label htmlFor="noShow">No Show:</label>
                                                </div>
                                            </div>
                                            <div className="col-md-auto my-auto">
                                                <FontAwesomeIcon onClick={resetRule} icon={faTrash} />
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