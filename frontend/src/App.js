import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Button, Nav, Navbar} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Helmet} from 'react-helmet';
import Home from './Home';
import SchedulePage from './Schedule/SchedulePage';
import ResultsPage from './Results/ResultsPage';

function App() {
  

  return (
    <div>   
      <Router>
        <Navbar bg='dark' variant='dark' expand>
          <Navbar.Brand>Americans Abroad</Navbar.Brand>
          <LinkContainer className='link-container' to='/'>
            <Nav.Link className='header-link'>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer className='link-container' to='/schedule'>
            <Nav.Link className='header-link'>Schedule</Nav.Link>
          </LinkContainer>
          <LinkContainer className='link-container' to='/results'>
            <Nav.Link className='header-link'>Results</Nav.Link>
          </LinkContainer>
        </Navbar>
        <Switch>
          <Route exact path = '/'>
            <Home />
          </Route>
          <Route exact path='/schedule'>
            <SchedulePage />
          </Route>
          <Route exact path ='/results'>
            <ResultsPage />
          </Route>
        </Switch>
      </Router>
      <a href='https://buymeacoffee.com/usmntio' class='donate-button'>Help pay for server costs?</a>
    </div>
  );
}

export default App;
