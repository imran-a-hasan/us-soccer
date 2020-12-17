import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Home from './Home';
import SchedulePage from './Schedule/SchedulePage';
import ResultsPage from './Results/ResultsPage';
import PlayerBio from './PlayerBio';
import Players from './Players';

function App() {
  
  return (
    <div>   
      <Router>
        <Navbar bg='dark' variant='dark' expand>
          <Navbar.Brand>Americans Abroad</Navbar.Brand>
          <LinkContainer className='show-link-container' to='/'>
            <Nav.Link className='header-link'>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer className='show-link-container' to='/players'>
            <Nav.Link className='header-link'>Players</Nav.Link>
          </LinkContainer>
          <LinkContainer className='hide-link-container' to='/schedule'>
            <Nav.Link className='header-link'>Schedule</Nav.Link>
          </LinkContainer>
          <LinkContainer className='hide-link-container' to='/results'>
            <Nav.Link className='header-link'>Results</Nav.Link>
          </LinkContainer>
        </Navbar>
        <Switch>
          <Route exact path = '/'>
            <Home />
          </Route>
          <Route exact path = '/players'>
            <Players />
          </Route>
          <Route exact path='/schedule'>
            <SchedulePage />
          </Route>
          <Route exact path ='/results'>
            <ResultsPage />
          </Route>
          <Route path = '/players/:id'>
            <PlayerBio />
          </Route>
        </Switch>
      </Router>
      <a href='https://buymeacoffee.com/usmntio' className='donate-button'>Help pay for server costs?</a>
    </div>
  );
}

export default App;
