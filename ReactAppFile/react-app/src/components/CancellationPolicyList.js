import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    retrievePolicy,
} from "../actions/actioncreator";
import data from "../data.json";
import { Link } from "react-router-dom";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import CancellationPolicy from "./CancellationPolicy";
import { Table } from 'react-bootstrap';

const CancellationPolicyList = () => {

    const [showRules, setShowRules] = useState(false);
    const [icon, setIcon] = useState("faAngleRight")
    const policies = useSelector(state => state.policies);/*data;*/
    const dispatch = useDispatch();


    //wHY empty array ?
    useEffect(() => {
        dispatch(retrievePolicy());
    }, []);


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
    //UI Part add search
    return (
        <div>
            <h5>Cancellation Policy Table</h5>
            {policies ? (

                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="panel-body">
                                <Table bordered>
                                    <thead>
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
                                        {policies.map((policy) => {
                                            console.log(policy);
                                            return (
                                                <CancellationPolicy policy={policy} />
                                            );
                                        })
                                        }
                                    </tbody>
                                </Table >
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<p className="d-flex justify-content-center">The policy table is empty</p>)
            }
        </div >
    );

};

export default CancellationPolicyList;