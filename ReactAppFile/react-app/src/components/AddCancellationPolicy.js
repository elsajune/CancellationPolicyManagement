import { Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCancellationPolicy } from "../actions/actioncreator";
import Rule from "./Rule";

const AddCancellationPolicy = () => {
    const intialPolicyState = {
        id: " ",
        policyName: "",
        policyDescription: "",
        policySource: "",
        policyCancelRestrictionDays: 0,
        policyCancelRestrictionHours: 0,
        policyUpdateBy: "",
        policyUpdateOn: ""
    };

    //From Redux
    const [policy, setPolicy] = useState(intialPolicyState);
    //Local State
    const [addedPolicy, setAddedPolicy] = useState(false);
    const [showRule, setShowRule] = useState(false);
    const [noShow, setNoShow] = useState(false); //noShow - true ==> disable the offsets

    //To dispatch action to the store
    const dispatch = useDispatch();

    //handle change in the input and update the policy 
    const handleInputChange = event => {
        const { name, value } = event.target;
        setPolicy({ ...policy, [name]: value });
    };

    const saveCancellationPolicy = () => {
        //Value added to the DB and the policy that was returned in the response is used to setPolicy
        dispatch(createCancellationPolicy(policy)).then(data => {
            setPolicy({
                id: data.id,
                policyName: data.policyName,
                policyDescription: data.policyDescription,
                policySource: data.policySource,
                policyCancelRestrictionDays: data.policyCancelRestrictionDays,
                policyCancelRestrictionHours: data.policyCancelRestrictionHours,
                policyUpdateBy: data.policyUpdateBy,
                policyUpdateOn: data.policyUpdateOn,
            });
            setAddedPolicy(true);
        }).catch((error) => {
            console.log(error);
        });
    };

    const newCancellationPolicy = () => {
        setPolicy(intialPolicyState);
        setAddedPolicy(false);
    };
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
                        <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                            <option selected>Open this select menu</option>
                            <option value="expedia">Expedia</option>
                            <option value="provider">Provider</option>
                        </select>
                    </div>
                    <Rule />
                </div>

                <div class="card">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Restrictions</h6>
                        
                        <span>
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

                        </span>

                    </div>
                </div>

            </div>

        </div>);
}
export default AddCancellationPolicy;