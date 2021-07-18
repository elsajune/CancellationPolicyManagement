import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
} from "@fortawesome/free-solid-svg-icons";

import AddCancellationPolicy from "./components/AddCancellationPolicy";
import CancellationPolicy from "./components/CancellationPolicy";
import CancellationPolicyList from "./components/CancellationPolicyList";

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark ">
        <a href="/" className="navbar-brand">
          <FontAwesomeIcon icon={faCar} />
          {`   `}Cars Admin Tool
        </a>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/cancellationpolicies"} className="nav-link">View Policies</Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">Add New Policy</Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/cancellationpolicies" component={CancellationPolicyList} />
          <Route exact path={["/", "/add"]} component={AddCancellationPolicy} />
          <Route path="/cancellationpolicies/:id" component={CancellationPolicy} />
        </Switch>
      </div>
    </Router>

  );
}
