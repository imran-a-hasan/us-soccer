import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Schedule from './Schedule';

function App() {
  

  return (
   <Router>
      <Switch>
        <Route exact path='/'>
          <Schedule />
        </Route>
      </Switch>
   </Router>
  );
}

export default App;
