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
                 <div className="container " >
                    <div class="row ">
                        <div className="col border border-dark"></div>
                        <div className="col border border-dark">Policy Name</div>
                        <div className="col border border-dark">Policy Description</div>
                        <div className="col border border-dark ">Policy Source</div>
                        <div className="col border border-dark ">Cancel Restriction Days</div>
                        <div className="col border border-dark ">Cancel Restriction Hours</div>
                        <div className="col border border-dark ">Updated By</div>
                        <div className="col border border-dark ">Updated On</div>
                        <div className="col border border-dark ">Actions</div>
                    </div >
                   
                        {data.policies.map((policy) => {
                            console.log(policy);
                            return (
                                <CancellationPolicy policy ={policy}/>
                            );
                        })
                        }
                    
                </div>) : (<p className="d-flex justify-content-center">The policy table is empty</p>)
            }
        </div>
    );

};

export default CancellationPolicyList;