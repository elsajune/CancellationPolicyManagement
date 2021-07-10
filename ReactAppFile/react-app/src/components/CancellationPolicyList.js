import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    retrievePolicy,
} from "../actions/actioncreator";
import data from "../data.json";
import { Link } from "react-router-dom";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const CancellationPolicyList = () => {

    const [showRules, setShowRules] = useState(false);
    const [icon, setIcon] = useState("faAngleRight")
    // const policies = data; /*useSelector(state => state.policies);*/
    const dispatch = useDispatch();


    //wHY empty array ?
    /*useEffect(() => {
        dispatch(retrievePolicy());
    }, []);*/


    const handleArrowClick = () => {
        if (icon === "faAngleRight") {
            setIcon("faAngleDown");
            setShowRules(true);
        } else {
            setIcon("faAngleRight");
            setShowRules(false);
        }
    }

    //UI Part add search
    return (
        <div>
            <h5>Cancellation Policy Table</h5>
            {data.policies ? (
                <table className="table table-bordered" >
                    <thead >
                        <tr style={{ textAlign: "center" }}>
                            <th scope="col"></th>
                            <th scope="col">Policy Name</th>
                            <th scope="col">Policy Description</th>
                            <th scope="col">Policy Source</th>
                            <th scope="col">Cancel Restriction Days</th>
                            <th scope="col">Cancel Restriction Hours</th>
                            <th scope="col">Updated By</th>
                            <th scope="col">Updated On</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.policies.map((policy) => {
                            console.log(policy);
                            return (
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
                                    

                                    {
                                        showRules && (<td style ={{display: "tableRow"}}
                                            >
                                        <table className="table table-bordered" >
                                            <thead >
                                                <tr style={{ textAlign: "center" }}>
                                                    <th scope="col"></th>
                                                    <th scope="col">Policy Name</th>
                                                    <th scope="col">Policy Description</th>
                                                    <th scope="col">Policy Source</th>
                                                    <th scope="col">Cancel Restriction Days</th>
                                                    <th scope="col">Cancel Restriction Hours</th>
                                                    <th scope="col">Updated By</th>
                                                    <th scope="col">Updated On</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                            </table>
                                            </td>
                                            )
                                    }
                               </tr>
                                            );
                        })
                        }
                    </tbody>
                </table>) : (<p className="d-flex justify-content-center">The policy table is empty</p>)
            }
        </div>
                    );

};

                    export default CancellationPolicyList;