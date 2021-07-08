import React from "react";
import "./sidebar.css";
import SideBar from "./components/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AddCancellationPolicy from "./components/AddCancellationPolicy";
import CancellationPolicy from "./components/CancellationPolicy";
import CancellationPolicyList from "./components/CancellationPolicyList";

export default function App() {
  return (
    <div className="App">
      <Router>
      <SideBar />
      <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/cancellationpolicies"]} component={CancellationPolicyList} />
                        <Route exact path="/add" component={AddCancellationPolicy} />
                        <Route path="/cancellationpolicies/:id" component={CancellationPolicy} />
                    </Switch>
                </div>
            </Router>
    </div>
  );
}
