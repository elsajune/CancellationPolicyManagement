
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
        curreny: "",
        noShow: "",

    };

    const [rule, setRule] = useState(intialRuleState);
    //handle change in the input and update the rule
    const handleRuleChange = event => {
        const { name, value } = event.target;
        setRule({ ...rule, [name]: value });
    };

    return (<div>
        <ul class="list-group">
            <li class="list-group-item">
                <table>
                    <tr>
                        <td>
                            <div className="form-group">
                                <label htmlFor="offSetDays">Offset Days</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="offSetDays"
                                    required
                                    min="0"
                                    value={rule.offSetDays}
                                    onChange={handleRuleChange}
                                    name="offSetDays"
                                />
                            </div>
                        </td>
                        <td>
                            <div className="form-group">
                                <label htmlFor="offSetHours">Offset Hours</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="offSetHours"
                                    required
                                    min="0"
                                    value={rule.offSetDays}
                                    onChange={handleRuleChange}
                                    name="offSetHours"
                                />
                            </div>
                        </td>
                        <td>
                            <div className="form-group">
                                <label htmlFor="value">Value</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="value"
                                    required
                                    min="0"
                                    value={rule.offSetDays}
                                    onChange={handleRuleChange}
                                    name="value"
                                />
                            </div>
                        </td>
                        <td>
                            <label>
                                curreny:
                                <select id="curreny" name="curreny" onChange={handleRuleChange}>
                                    <option selected>Open this select menu</option>
                                    <option value="USD">USD</option>
                                    <option value="INR">INR</option>
                                </select>
                            </label>
                        </td>
                        <td>
                            <label>
                                No Show:
                                <select id="noShow" name="noShow" onChange={handleRuleChange}>
                                    <option selected>Open this select menu</option>
                                    <option value="NO">NO</option>
                                    <option value="YES">YES</option>
                                </select>
                            </label>
                        </td>
                    </tr>
                </table>
            </li>
        </ul>

    </div>);
}
export default AddRule;