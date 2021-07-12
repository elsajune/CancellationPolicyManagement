import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
} from "@fortawesome/free-solid-svg-icons";


const RuleList = (props) => {

    const rules = props.rules;


    return (<div className="d-grid gap-3">
        {
            rules && rules.map(rule => {
                return (
                    <div  key = {rule.key} className="container d-grid gap-3">

                        <div className="row row-cols-6 justify-content-center h-100 v-100 ">
                            <div className="col">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="offSetDays"
                                        required
                                        min="0"
                                        value={rule.offSetDays}
                                        onChange={event => props.updateRule(event.target.value, rule.key)}
                                        name="offSetDays"
                                    />
                                    <label htmlFor="offSetDays">Offset Days</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-floating">
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
                                    <label htmlFor="offSetHours">Offset Hours</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-floating">
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
                                    <label htmlFor="value">Value</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-floating selectpicker">
                                    <select className="form-select" id="curreny" name="curreny" onChange={event => props.updateRule(event.target.value, rule.key)}>
                                        {/*selected changed to value*/}
                                        <option value="">Select</option>
                                        <option value="USD">USD</option>
                                        <option value="INR">INR</option>
                                    </select>
                                    <label htmlFor="curreny">Curreny</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-floating selectpicker">
                                    <select className="form-select" id="noShow" name="noShow" onChange={event => props.updateRule(event.target.value, rule.key)}>
                                        <option value="">Select</option>
                                        <option value="NO">NO</option>
                                        <option value="YES">YES</option>
                                    </select>
                                    <label htmlFor="noShow">No Show:</label>
                                </div>
                            </div>
                            <div className="col-md-auto my-auto">
                                <FontAwesomeIcon onClick={() => {
                                    props.deleteRule(rule.key)
                                }} icon={faTrash} />
                            </div>
                        </div>
                    </div>
                );
            })
        }

    </div>);
}
export default RuleList;