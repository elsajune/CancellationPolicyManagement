import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
} from "@fortawesome/free-solid-svg-icons";


const RuleList = (props) => {

    const rules = props.rules;


    return (<div>
        {
            rules.map(rule => {
                return (
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label htmlFor="offSetDays">Offset Days</label>
                                        <input
                                            type="number"
                                            id="offSetDays"
                                            required
                                            min="0"
                                            value={rule.offSetDays}
                                            onChange={event => props.updateRule(event.target.value, rule.key)}
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
                                            value={rule.offSetHours}
                                            onChange={event => props.updateRule(event.target.value, rule.key)}
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
                                            value={rule.value}
                                            onChange={event => props.updateRule(event.target.value, rule.key)}
                                            name="value"
                                        />
                                    </div>
                                </td>
                                <td>
                                    <label>
                                        Curreny:
                                        <select id="curreny" name="curreny" onChange={event => props.updateRule(event.target.value, rule.key)}>
                                            <option selected>Select</option>
                                            <option value="USD">USD</option>
                                            <option value="INR">INR</option>
                                        </select>
                                    </label>
                                </td>
                                <td>
                                    <label htmlFor="noShow">No Show:</label>
                                    <select id="noShow" name="noShow" onChange={event => props.updateRule(event.target.value, rule.key)}>
                                        <option selected>Select</option>
                                        <option value="NO">NO</option>
                                        <option value="YES">YES</option>
                                    </select>

                                </td>
                                <td>
                                    <FontAwesomeIcon onClick={() => {
                                        props.deleteRule(rule.key)
                                    }} icon={faTrash} />
                                </td>
                            </tr>
                        </tbody>
                    </table>);
            })
        }

    </div>);
}
export default RuleList;