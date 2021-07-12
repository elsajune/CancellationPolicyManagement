import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    retrievePolicy,
} from "../actions/actioncreator";
import data from "../data.json";
import CancellationPolicy from "./CancellationPolicy";
import { Table } from 'react-bootstrap';

const CancellationPolicyList = () => {

    const [showRules, setShowRules] = useState(false);
    const [icon, setIcon] = useState("faAngleRight");
    const dispatch = useDispatch();
    const policies = useSelector((state) => {return state.policies});/*data;*/
    
    useEffect(() => {
        dispatch(retrievePolicy());
    },[dispatch]);


    //UI Part add search
    return (
        <div>
            <h5 onClick={()=>{console.log(policies)}}>Cancellation Policy Table</h5>
            {data.policies ? (

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
                                        {data.policies.map((policy) => {
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