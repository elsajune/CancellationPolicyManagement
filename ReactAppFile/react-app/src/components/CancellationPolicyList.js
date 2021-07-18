import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    retrievePolicy,
} from "../actions/actioncreator";
import data from "../data.json";
import CancellationPolicy from "./CancellationPolicy";
import { Table } from 'react-bootstrap';

const CancellationPolicyList = () => {

    const dispatch = useDispatch();
    const policyList = useSelector((state) =>  state.policyReducer );

    useEffect(() => {
        console.log("dispatched");
        dispatch(retrievePolicy());
    }, [dispatch]);

    return (
        <div>
            <h5 onClick={() => { console.log("policiesList from useSelector", policyList) }}>Cancellation Policy Table</h5>
            {/*Check if policies is null if null display table empyt*/}
            {policyList ? (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel-body">
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
                                        {policyList.map((policy) => {
                                            return (
                                                <CancellationPolicy policy={policy} key={policy.policyId}/>
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