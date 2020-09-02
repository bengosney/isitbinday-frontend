import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LoginScreen from './screens/LoginScreen';
import Auth from './Auth';
import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRoute';

import 'semantic-ui-css/semantic.min.css';
import TaskListScreen from './screens/TaskListScreen';
import LoggedInScreen from './screens/LoggedInScreen';

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
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/tasks">Task List</Link>
                  </li>
                </ul>
              </header>
              <hr />
              <LoggedInScreen />
            </div>
          </PrivateRoute>
        </Switch>
      </Router>
    </Auth>
  );
}

export default App;
