import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LoginScreen from './screens/LoginScreen';
import Auth from './Auth';
import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRoute';

import 'semantic-ui-css/semantic.min.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Auth>
      <Router>
        <Switch>
          <Route exact path="/">
            <h1>Is is bin day?</h1>
            <Link to="/login">Login</Link>
          </Route>
          <PublicRoute path="/login">
            <LoginScreen />
          </PublicRoute>
          <PrivateRoute path="/dashboard">
            <div className="App">
              <header className="App-header">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/test">Test Page</Link>
                  </li>
                </ul>
              </header>
              <hr />
              <div>
                <div>
                  <h1>Home</h1>
                </div>
              </div>
            </div>
          </PrivateRoute>
        </Switch>
      </Router>
    </Auth>
  );
}

export default App;
