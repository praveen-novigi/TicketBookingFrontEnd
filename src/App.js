import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from './Views/LandingPage';
import SignUp from './Views/SignUp';
import SignIn from './Views/SignIn';
import ChatScreen from './Views/ChatScreen';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/sign/up" component={SignUp} />
          <Route exact path="/sign/in" component={SignIn} />
          <Route exact path="/chat" component={ChatScreen} />
        </Switch>
      </Router>
  );
}

export default App;
