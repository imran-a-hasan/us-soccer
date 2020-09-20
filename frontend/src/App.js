import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Home from './Home';
import SchedulePage from './Schedule/SchedulePage';
import ResultsPage from './Results/ResultsPage';

function App() {
  

  return (
    <div>   
      <Router>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand>Americans Abroad</Navbar.Brand>
          <LinkContainer to='/'>
            <Nav.Link className='header-link'>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/schedule'>
            <Nav.Link className='header-link'>Schedule</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/results'>
            <Nav.Link className='header-link'>Results</Nav.Link>
          </LinkContainer>
        </Navbar>
        <Switch>
          <Route exact path = '/'>
            <Home />
          </Route>
          <Route exact path='/schedule/:month?'>
            <SchedulePage />
          </Route>
          <Route exact path ='/results/:month?'>
            <ResultsPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
