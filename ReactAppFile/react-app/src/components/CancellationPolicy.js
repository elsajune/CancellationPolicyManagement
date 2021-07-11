import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePolicy, deletePolicy } from "../actions/actioncreator";
import CancellationPolicyService from "../services/CancellationPolicyService";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
        rules: []
    };

    const [policy, setPolicy] = useState(JSON.parse(JSON.stringify(props.policy)));
    const [message, setMessage] = useState("");
    const [showRules, setShowRules] = useState(false);
    const [icon, setIcon] = useState("faAngleRight");

    const handleArrowClick = () => {
        if (icon === "faAngleRight") {
            setIcon("faAngleDown");
            setShowRules(true);
        } else {
            setIcon("faAngleRight");
            setShowRules(false);
        }
    }



    const dispatch = useDispatch();

    const getPolicy = (id) => {
        CancellationPolicyService.get(id)
            .then(response => {
                setPolicy(response.data);
                console.log(response.data);
            }).catch(error => {
                console.log(error)
            });
    };

    //What is props.match.params.id?
    /*useEffect(() => {
        getPolicy(props.match.params.id);
    }, [props.match.params.id]);*/

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPolicy({ ...policy, [name]: value });
    };

    const updateContent = () => {
        dispatch(updatePolicy(policy.id, policy))
            .then(response => {
                console.log(response);
                setMessage("The policy was updated successfully!");
            })
            .catch(error => {
                console.log(error);
            });
    };

    const removePolicy = () => {
        dispatch(deletePolicy(policy.id))
            .then(() => {
                props.history.push("/cancellationpolicies");
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div class="row ">
            <div className="col border border-dark"><FontAwesomeIcon onClick={handleArrowClick} icon={faAngleRight} /></div>
            <div className="col border border-dark">{policy.policyName}</div>
            <div className="col border border-dark">{policy.policyDescription}</div>
            <div className="col border border-dark">{policy.policySource}</div>
            <div className="col border border-dark">{policy.policyCancelRestrictionDays}</div>
            <div className="col border border-dark">{policy.policyCancelRestrictionHours}</div>
            <div className="col border border-dark">{policy.policyUpdatedBy}</div>
            <div className="col border border-dark">{policy.policyUpdatedOn}</div>
            <div className="col border border-dark">Edit</div>


            {
                (policy.rules.length!==0) && showRules && (<div>
                    <table className="table table-bordered" >
                        <thead >
                            <tr style={{ textAlign: "center" }}>
                                <th scope="col">Offset Hours</th>
                                <th scope="col">Offset Days</th>
                                <th scope="col">Fee Basis</th>
                                <th scope="col">Value</th>
                                <th scope="col">Currency</th>
                                <th scope="col">No Show</th>
                            </tr>
                        </thead>

                        <tbody>
                            {policy.rules.map((rule) => {
                                console.log(rule);
                                return (
                                    <tr>
                                        <th scope="col">{rule.offSetHours}</th>
                                        <th scope="col">{rule.offSetDays}</th>
                                        <th scope="col">{rule.feeBasis}</th>
                                        <th scope="col">{rule.value}</th>
                                        <th scope="col">{rule.currency}</th>
                                        <th scope="col">{rule.noShow}</th>
                                    </tr>
                                );
                            }
                            )}


                        </tbody>
                    </table>
                </div>
                )
            }
        </div>
    );

};

export default CancellationPolicy;