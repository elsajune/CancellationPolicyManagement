import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePolicy, deletePolicy } from "../actions/actioncreator";
import CancellationPolicyService from "../services/CancellationPolicyService";

const CancellationPolicy = (props) => {
    const intialPolicyState = {
        id: 0,
        policyName: "",
        policyDescription: "",
        policySource: "",
        policyCancelRestrictionDays: 0,
        policyCancelRestrictionHours: 0,
        policyUpdateBy: "",
        policyUpdateOn: "",
        rules:[]
    };

    const [currentPolicy, setCurrentPolicy] = useState(intialPolicyState);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getPolicy = (id) => {
        CancellationPolicyService.get(id)
            .then(response => {
                setCurrentPolicy(response.data);
                console.log(response.data);
            }).catch(error => {
                console.log(error)
            });
    };

    //What is props.match.params.id?
    useEffect(() => {
        getPolicy(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentPolicy({ ...currentPolicy, [name]: value });
    };

    const updateContent = () => {
        dispatch(updatePolicy(currentPolicy.id, currentPolicy))
            .then(response => {
                console.log(response);
                setMessage("The policy was updated successfully!");
            })
            .catch(error => {
                console.log(error);
            });
    };

    const removePolicy = () => {
        dispatch(deletePolicy(currentPolicy.id))
            .then(() => {
                props.history.push("/cancellationpolicies");
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            {currentPolicy ? (
                <div className="edit-form">
                    <h4>Tutorial</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="policyName">Policy Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="policyName"
                                required
                                value={currentPolicy.policyName}
                                onChange={handleInputChange}
                                name="policyName"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="policyDescription">Policy Description</label>
                            <input
                                type=""
                                className="form-control"
                                id="policyDescription"
                                required
                                value={currentPolicy.policyDescription}
                                onChange={handleInputChange}
                                name="policyDescription"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="policySource">Policy Source</label>
                            <input
                                type="text"
                                className="form-control"
                                id="policySource"
                                required
                                value={currentPolicy.policySource}
                                onChange={handleInputChange}
                                name="policySource"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="policyCancelRestrictionDays">Policy policyCancelRestrictionDays</label>
                            <input
                                type="number"
                                className="form-control"
                                id="policyCancelRestrictionDays"
                                required
                                value={currentPolicy.policyCancelRestrictionDays}
                                onChange={handleInputChange}
                                name="policyCancelRestrictionDays"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="policyCancelRestrictionHours">Policy policyCancelRestrictionHours</label>
                            <input
                                type="text"
                                className="form-control"
                                id="policyCancelRestrictionHours"
                                required
                                value={currentPolicy.policyCancelRestrictionHours}
                                onChange={handleInputChange}
                                name="policyCancelRestrictionHours"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="policyUpdateBy">Policy policyUpdateBy</label>
                            <input
                                type="text"
                                className="form-control"
                                id="policyUpdateBy"
                                required
                                value={currentPolicy.policyDescription}
                                onChange={handleInputChange}
                                name="policyUpdateBy"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="policyUpdateOn">Policy policyUpdateOn</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="policyUpdateOn"
                                required
                                value={currentPolicy.policyUpdateOn}
                                onChange={handleInputChange}
                                name="policyUpdateOn"
                            />
                        </div>
                    </form>
                    <button className="badge badge-danger mr-2" onClick={removePolicy}>
                        Delete
          </button>
                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateContent}
                    >
                        Update
          </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Policy...</p>
                </div>
            )}
        </div>
    );

};

export default CancellationPolicy;