import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Schedule from './Schedule';

function App() {
  

  return (
   <Router>
      <Switch>
        <Route exact path = '/'>
          <Redirect to='/schedule' />
        </Route>
        <Route exact path='/schedule/:month?'>
          <Schedule />
        </Route>
      </Switch>
   </Router>
  );
}

export default App;
