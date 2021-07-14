import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePolicy, deletePolicy } from "../actions/actioncreator";
import { useHistory } from "react-router-dom";
import { faAngleRight, faAngleDown, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const CancellationPolicy = (props) => {

    const [policy, setPolicy] = useState(JSON.parse(JSON.stringify(props.policy)));
    const [message, setMessage] = useState("");
    const [showRules, setShowRules] = useState(false);
    const [icon, setIcon] = useState("faAngleRight");

    const dispatch = useDispatch();
    let history = useHistory();

    //OnClick show the rules table if present
    const handleArrowClick = () => {
        if (icon === "faAngleRight") {
            setIcon("faAngleDown");
            setShowRules(true);
        } else {
            setIcon("faAngleRight");
            setShowRules(false);
        }
    }

     const updateContent = () => {
        dispatch(updatePolicy(policy.policyId, policy))
            .then(response => {
                console.log(response);
                setMessage("The policy was updated successfully!");
            })
            .catch(error => {
                console.log(error);
            });
    };

    const removePolicy = (policy) => {
        console.log(policy.policyId);
        dispatch(deletePolicy(policy.policyId))
            .then(() => {
                /*to refresh the page*/
                history.push("/cancellationpolicies");
            })
            .catch(error => {
                console.log(error);
            });
    };

    const updatePolicy = () =>{
        
    }

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
            <td><span>
               <FontAwesomeIcon onClick={handleArrowClick} icon={faEdit} />
               {'      '}
               <FontAwesomeIcon onClick={() => removePolicy(policy)} icon={faTrash} />
            </span></td>
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
                                        <td>{rule.offSetHours}</td>
                                        <td>{rule.offSetDays}</td>
                                        <td>{rule.feeBasis}</td>
                                        <td>{rule.value}</td>
                                        <td>{rule.currency}</td>
                                        <td>{rule.noShow}</td>
                                    </tr>
                                );
                            }
                            )}

                        </tbody>
                    </table>
                </td>
                )
            }
            {

            }
        </tr>
    </>
    );

};

export default CancellationPolicy;