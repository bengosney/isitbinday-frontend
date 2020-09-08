import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Auth from './Auth';
import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRoute';

import 'semantic-ui-css/semantic.min.css';
import PrivateSection from './sections/PrivateSection';
import LoginForm from './widgets/LoginForm';


function App() {
  return (
    <div className="App">
      <Auth>
        <Router>
          <Switch>
            <Route exact path="/">
              <h1>Is is bin day?</h1>
              <Link to="/login">Login</Link>
            </Route>
            <PublicRoute path="/login">
              <LoginForm />
            </PublicRoute>
            <PrivateRoute path="/iibd">
              <PrivateSection />
            </PrivateRoute>
          </Switch>
        </Router>
      </Auth>
    </div>
  );
}

export default App;
