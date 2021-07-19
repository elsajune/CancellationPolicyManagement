import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePolicy, deletePolicy } from "../actions/actioncreator";
import { useHistory } from "react-router-dom";
import { faAngleRight, faAngleDown, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateCancellationPolicy from "./UpdateCancellationPolicyTest";
import UpdateCancellationPolicyTest from "./UpdateCancellationPolicy";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const CancellationPolicyTest = (props) => {

    const [policy, setPolicy] = useState(JSON.parse(JSON.stringify(props.policy)));
    const [updatePolicy, setUpdatePolicy] = useState(false);
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

    const handleEditClick = () => {
        setUpdatePolicy(true);
    }

    const cancelUpdate = () => {
        setUpdatePolicy(false);
    }


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
                <FontAwesomeIcon onClick={handleEditClick} icon={faEdit} />
                {'      '}
                <Router>
                    <Link
                        to={{
                            pathname: "/edit",
                            search: "?sort=name",
                            hash: "#the-hash",
                            state: { policy,cancelUpdate }
                        }}
                    >
                   <FontAwesomeIcon icon={faEdit} /></Link>
                    <div className="container mt-3">
                        <Switch>
                            <Route exact path="/edit" component={UpdateCancellationPolicy} />

                        </Switch>
                    </div>
                </Router>
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
                                    <tr key={Date.now()}>
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
                updatePolicy && (<td style={{ backgroundColor: "#dad5de" }} colSpan="9"><UpdateCancellationPolicy policy={policy} cancelUpdate={cancelUpdate} /></td>)

            }
        </tr>
    </>
    );

};

export default CancellationPolicyTest;