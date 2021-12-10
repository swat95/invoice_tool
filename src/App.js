import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/invoice-dashboard" ></Redirect>
          <Route path="/invoice-dashboard"
            render={(props) => (
              <Dashboard {...props} />
            )}>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
