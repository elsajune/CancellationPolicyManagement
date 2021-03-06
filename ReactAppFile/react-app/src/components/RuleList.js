import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

const RuleList = (props) => {

    const rules = props.rules;

    return (<div className="d-grid gap-3" key={Date.now()}>
        {
            rules && rules.map(rule => {
                return (
                    <div key={rule.key} className="container d-grid gap-3">
                        <div key={rule.key} className="row row-cols-6 justify-content-center h-100 v-100 ">
                            <div className="col">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="offSetDays"
                                        required
                                        disabled = {rule.noShow === "YES"}
                                        min="0"
                                        value={rule.offSetDays}
                                        onChange={(event) => { props.updateRule(event, rule.key) }}
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
                                        disabled = {rule.noShow === "YES"}
                                        min="0"
                                        max = "23"
                                        value={rule.offSetHours}
                                        onChange={(event) => { props.updateRule(event, rule.key) }}
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
                                        onChange={(event) => { props.updateRule(event, rule.key) }}
                                        name="value"
                                    />
                                    <label htmlFor="value">Value</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-floating selectpicker">
                                    <select value={rule.currency} className="form-select" id="currency" name="currency" onChange={(event) => { props.updateRule(event, rule.key) }}>
                                        {/*selected changed to value*/}
                                        <option value="">Select</option>
                                        <option value="USD">USD</option>
                                        <option value="INR">INR</option>
                                    </select>
                                    <label htmlFor="currency">Currency</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-floating selectpicker">
                                    <select value={rule.noShow} className="form-select" id="noShow" name="noShow" onChange={(event) => { props.updateRule(event, rule.key) }}>
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