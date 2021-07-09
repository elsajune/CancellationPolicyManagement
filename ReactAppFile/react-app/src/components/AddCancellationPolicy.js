import { Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCancellationPolicy } from "../actions/actioncreator";
import AddRule from "./AddRule";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddCancellationPolicy = () => {
    const intialPolicyState = {
        id: " ",
        policyName: "",
        policyDescription: "",
        policySource: "",
        policyCancelRestrictionDays: 0,
        policyCancelRestrictionHours: 0,
        policyUpdateBy: "",
        policyUpdateOn: "",
        rules: []
    };

    const intialRuleState = {
        id: " ",
        offSetDays: 0,
        offSetHours: 0,
        feeBasis: "amount",
        value: 0,
        curreny: "",
        noShow: false,
        key: Date.now()

    };

    const [rule, setRule] = useState(intialRuleState);
    const [policy, setPolicy] = useState(intialPolicyState);
    const [addedPolicy, setAddedPolicy] = useState(false);
    const [showRule, setShowRule] = useState(false);
    const [message, setMessage] = useState("");

    //To dispatch action to the store
    const dispatch = useDispatch();

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
        }
    };

    //handle change in the input and update the rule
    const handleRuleChange = event => {
        const { name, value } = event.target;
        setRule({ ...rule, [name]: value });
    };

    const createRule = (event) => {
        const newRule = { ...rule };
        delete newRule.key;
        const newRules = [...policy.rules, newRule];
        //Check setPolicy again
        setPolicy({ ...policy, [rules]: newRules });
        setRule(intialRuleState);
    }


    const saveCancellationPolicy = () => {
        //Value added to the DB and the policy that was returned in the response is used to setPolicy
        dispatch(createCancellationPolicy(policy)).then(data => {
            setPolicy(
                JSON.parse(JSON.stringify(data))
                /* Test if above code working
                {
                id: data.id,
                policyName: data.policyName,
                policyDescription: data.policyDescription,
                policySource: data.policySource,
                policyCancelRestrictionDays: data.policyCancelRestrictionDays,
                policyCancelRestrictionHours: data.policyCancelRestrictionHours,
                policyUpdateBy: data.policyUpdateBy,
                policyUpdateOn: data.policyUpdateOn,
            }*/);
            setAddedPolicy(true);
        }).catch((error) => {
            console.log(error);
        });
    };

    const newCancellationPolicy = () => {
        setPolicy(intialPolicyState);
        setAddedPolicy(false);
    };

    const deleteRule = () => {

    }



    return (

        <div>
            <div class="alert alert-primary" role="alert">
                Add Car Rental Cancellation Policy
            </div>
            {addedPolicy && (
                <div class="alert alert-success" role="alert">
                    You submitted successfully!
                    <button type="button" class="btn btn-primary btn-sm float-right" onClick={newCancellationPolicy}> Add New Policy</button>
                </div>)}
            <div className="submit-form ">
                <Card>
                    <Card.Body>
                        <table class="table table-borderless">
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label htmlFor="policyName">Policy Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="policyName"
                                            required
                                            value={policy.policyName}
                                            onChange={handleInputChange}
                                            name="policyName"
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <label htmlFor="policyDescription">Policy Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="policyDescription"
                                            required
                                            value={policy.policyDescription}
                                            onChange={handleInputChange}
                                            name="policyDescription"
                                        />
                                    </div>
                                </td>

                            </tr>
                        </table>
                    </Card.Body>
                </Card>

                <div class="card">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Policy</h6>
                        <label>
                            Policy Provider :
                            <select id="policySource" name="policySource" onChange={handlePolicySource}>
                                <option selected>Open this select menu</option>
                                <option value="expedia">Expedia</option>
                                <option value="provider">Provider</option>
                            </select>

                        </label>
                        {/*Ruleset for the Expedia Policy Proivder*/}
                        {showRule && (
                            <div>
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <table>
                                            <tr>
                                                <td>
                                                    <div className="form-group">
                                                        <label htmlFor="offSetDays">Offset Days</label>
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
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <label htmlFor="offSetHours">Offset Hours</label>
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
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <label htmlFor="value">Value</label>
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
                                                    </div>
                                                </td>
                                                <td>
                                                    <label>
                                                        curreny:
                                                        <select id="curreny" name="curreny" onChange={handleRuleChange}>
                                                            <option selected>Open this select menu</option>
                                                            <option value="USD">USD</option>
                                                            <option value="INR">INR</option>
                                                        </select>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        No Show:
                                                        <select id="noShow" name="noShow" onChange={handleRuleChange}>
                                                            <option selected>Open this select menu</option>
                                                            <option value="NO">NO</option>
                                                            <option value="YES">YES</option>
                                                        </select>
                                                    </label>
                                                </td>
                                                <td>
                                                    <FontAwesomeIcon className="faicons" onClick={() => {
                                                        props.deleteItem(item.key)
                                                    }} icon="trash" />
                                                </td>
                                            </tr>
                                        </table>
                                    </li>
                                </ul>

                            </div>
                        )}
                    </div>
                </div>
                {/*End of the Ruleset for Expedia */}

                <div class="card">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Restrictions</h6>

                        <table >
                            <tr>
                                <td>Stop Cancel Before : </td>
                                <td>
                                    <div className="form-group">
                                        <label htmlFor="policyCancelRestrictionDays">Days</label>
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
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <label htmlFor="policyCancelRestrictionHours">Hours</label>
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
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>

        </div>);
}
export default AddCancellationPolicy;