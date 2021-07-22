import { Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState ,useEffect, useRef} from "react";
import { useDispatch } from "react-redux";
import { updatePolicy } from "../actions/actioncreator";
import RuleList from "./RuleList";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWindowClose
} from "@fortawesome/free-solid-svg-icons";

import validate from '../services/validateForm';

const UpdateCancellationPolicy = (props) => {

    let history = useHistory();

    const intialPolicyState = JSON.parse(JSON.stringify(props.policy));

    const intialRuleState = {
        ruleId: 0,
        offSetDays: 0,
        offSetHours: 0,
        feeBasis: "amount",
        value: 0,
        currency: "USD",
        noShow: "NO",
        key: Date.now()

    };

    const [rule, setRule] = useState(intialRuleState);
    const [policy, setPolicy] = useState(intialPolicyState);
    const [updatedPolicy, setUpdatedPolicy] = useState(false);
    const [showRule, setShowRule] = useState(false);
    const mountedRef = useRef(true);

    //To dispatch action to the store
    const dispatch = useDispatch();

    //To validate form 
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    //For form Validation
    useEffect(
        () => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                console.log("In UseEffect");
                updateContent();
            }
            return () => { mountedRef.current = false }
        },
        [errors]
    );

    /*handle functions for Expedia rules */
    const createRule = (event) => {
        event.preventDefault();
        const newRule = { ...rule };
        if (rule.noShow === "YES") {
            newRule.offSetDays = 0;
            newRule.offSetHours = 0;
        }
        const newRules = [...policy.rules, newRule];
        setPolicy({ ...policy, rules: newRules });
        console.log("Rule created", newRules);
        setRule(intialRuleState);
    }

    const deleteRule = (key) => {
        const filteredRules = policy.rules.filter(item =>
            item.key !== key);
        setPolicy({
            ...policy, rules: filteredRules
        })
    }

    const updateRule = (event, key) => {
        const { name, value } = event.target;
        const rules = JSON.parse(JSON.stringify(policy.rules));
        const updatedRules = rules.map(item => {
            let temp = Object.assign({}, item);
            if (temp.key === key) {
                temp = { ...temp, [name]: value }
                if (temp.noShow === "YES") {
                    temp.offSetDays = 0;
                    temp.offSetHours = 0;
                }
                return temp;
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
            });
           
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        if(policy.policySource !== "expedia"){
            setPolicy({
                ...policy, rules: []
            });
        }
        setErrors(validate(policy));
        setIsSubmitting(true);
    };

    const updateContent = () => {
        dispatch(updatePolicy(policy.policyId, policy))
            .then(response => {
                console.log("Updated Response", response);
                setUpdatedPolicy(true);
                history.push("/cancellationpolicies");
            })
            .catch(error => {
                console.log(error);
            });
    };


    return (
        <div>
            {/* Option to submit new Policy once the current Policy successfully added*/}
            {updatedPolicy && (
                <div className="alert alert-success" role="alert">
                    Policy Updated successfully!
                    <FontAwesomeIcon onClick={() => { props.cancelUpdate() }} icon={faWindowClose}  className="float-end" />
                   
                </div>)}

            {(!updatedPolicy) && (
                <div className="alert alert-primary" role="alert">
                    Update Car Rental Cancellation Policy
                    <FontAwesomeIcon onClick={() => { props.cancelUpdate() }} icon={faWindowClose}  className="float-end" />
                </div>)}
            {/*Add Policy Form (including ruleset for the Expedia policy Source*/}
                {(!updatedPolicy) && ( <form className="d-grid gap-3" noValidate>
                <Card bg="light">
                    <Card.Body>
                        <div className="container">
                            <div className="row row-cols-2">

                                <div className="col">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className={
                                                (errors.policyName)
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                            }
                                            id="policyName"
                                            required
                                            value={policy.policyName}
                                            onChange={handleInputChange}
                                            name="policyName"
                                            placeholder="Enter Policy Name"
                                        />
                                        <label htmlFor="policyName">Policy Name</label>
                                        <div className="invalid-feedback">
                                            Enter policy Name
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className={
                                                (errors.policyDescription)
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                            }
                                            id="policyDescription"
                                            required
                                            value={policy.policyDescription}
                                            onChange={handleInputChange}
                                            name="policyDescription"
                                        />
                                        <label htmlFor="policyDescription">Policy Description</label>
                                        <div className="invalid-feedback">
                                            Enter policy Description
                                        </div>
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
                                        <select
                                            className={
                                                (errors.policySource)
                                                    ? "form-select is-invalid"
                                                    : "form-select"
                                            }
                                            id="policySource" name="policySource"
                                            onChange={(event) => {
                                                handlePolicySource(event);
                                                handleInputChange(event);
                                               /* if ((policy.rules.length === 0 && event.target.value === "expedia")) {
                                                    console.log("Policy Source",event.target.value)
                                                    createRule(event);
                                                }*/
                                            }}>
                                            <option value=" ">Select Source</option>
                                            <option value="expedia">Expedia</option>
                                            <option value="provider">Provider</option>
                                        </select>
                                        <label htmlFor="policySource">Policy Source</label>
                                        <div className="invalid-feedback">
                                            Select Policy Source
                                        </div>
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
                                    <div className="row row-cols-1">
                                        <div className="col">
                                            <button className="btn btn-primary btn-sm float-end" onClick={createRule}>+Add Rule</button>
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
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-sm btn-primary me-md-2" type="button" onClick={handleSubmit}>Update Policy</button>
                    <button className="btn btn-primary btn-sm " type="button" onClick={() => { props.cancelUpdate() }} >Cancel</button>
                </div>
            </form> )}
        </div >);
}
export default UpdateCancellationPolicy;