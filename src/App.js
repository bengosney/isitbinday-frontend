import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LoginScreen from './screens/LoginScreen';
import Auth from './Auth';

import 'semantic-ui-css/semantic.min.css';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Auth>
    <Router>
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
          <Switch>
            <Route exact path="/">
              <div>
                <h1>Home</h1>
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    </Auth>
  );
}

export default App;
