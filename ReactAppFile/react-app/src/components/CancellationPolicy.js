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

    return (<>
        <tr>
            <td><FontAwesomeIcon onClick={handleArrowClick} icon={faAngleRight} /></td>
            <td>{policy.policyName}</td>
            <td>{policy.policyDescription}</td>
            <td>{policy.policySource}</td>
            <td>{policy.policyCancelRestrictionDays}</td>
            <td>{policy.policyCancelRestrictionHours}</td>
            <td>{policy.policyUpdatedBy}</td>
            <td>{policy.policyUpdatedOn}</td>
            <td>Edit</td>
        </tr>
        <tr>
            {
                (policy.rules.length !== 0) && showRules && (<td colSpan="9">
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
                                        <td scope="col">{rule.offSetHours}</td>
                                        <td scope="col">{rule.offSetDays}</td>
                                        <td scope="col">{rule.feeBasis}</td>
                                        <td scope="col">{rule.value}</td>
                                        <td scope="col">{rule.currency}</td>
                                        <td scope="col">{rule.noShow}</td>
                                    </tr>
                                );
                            }
                            )}

                        </tbody>
                    </table>
                </td>
                )
            }
        </tr>
    </>
    );

};

export default CancellationPolicy;