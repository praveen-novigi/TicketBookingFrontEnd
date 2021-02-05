import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from './Views/LandingPage';
import SignUp from './Views/SignUp';
import SignIn from './Views/SignIn';
import ChatScreen from './Views/ChatScreen';
import FlightList from './Components/FlightList'
import AllFlightList from './Views/AllFlightList';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/sign/up" component={SignUp} />
          <Route exact path="/sign/in" component={SignIn} />
          <Route exact path="/chat" component={ChatScreen} />
          <Route exact path="/flights" component={AllFlightList} />
        </Switch>
      </Router>
  );
}

export default App;
