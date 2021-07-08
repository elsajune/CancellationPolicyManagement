
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCancellationPolicy } from "../actions/actioncreator";
import Rule from "./Rule";


const AddRule = () => {
    const intialRuleState = {
        id: " ",
        offSetDays: 0,
        offSetHours: 0,
        feeBasis: "amount",
        value: 0,
        curreny: 0,
        noShow: false,
        
    };




    return (<div>
        <ul class="list-group">
            <li class="list-group-item">Cras justo odio</li>
        </ul>

    </div>);
}
export default AddRule;