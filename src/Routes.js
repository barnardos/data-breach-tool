import React from "react";
import { Route, Switch } from "react-router-dom";
import Analytics from "react-router-ga";

import ResultsPage from "./pages/ResultsPage";
import StartPage from "./pages/StartPage";
import SectionPage from "./pages/SectionPage";

import Timeout from "./components/Timeout";

const Routes = () => (
  <Analytics id={process.env.REACT_APP_GOOGLE_ANALYTICS}>
    <Switch>
      <Route exact path="/" component={StartPage} />
      <Route
        exact
        path="/section/:sectionId"
        component={Timeout(SectionPage)}
      />
      <Route exact path="/results" component={Timeout(ResultsPage)} />
      <Route component={StartPage} />
    </Switch>
  </Analytics>
);

export default Routes;
