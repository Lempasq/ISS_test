import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

// COMPONENTS
import Header from './components/header/header'

export default () => {
  return (
    <Router>
      <div className="Container">
          <Header />
        {/*<Switch>*/}
        {/*    <Route exact path="/" component={} />*/}
        {/*</Switch>*/}
      </div>
    </Router>
  );
};
