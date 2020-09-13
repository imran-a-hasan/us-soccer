import React, {useState} from 'react';
import {Card, Image, ListGroup, Navbar} from 'react-bootstrap';
import './css/schedule.css';

function Schedule() {
  const [apiResponse, setApiResponse] = useState(null);

  if (!apiResponse) {
    fetch("http://localhost:9000/schedule")
      .then(res => res.json())
      .then(res => {
          setApiResponse(res);
      });
  }

  function generateMatchDays() {
      const matchDays = {};
      for (let [date, matches] of Object.entries(apiResponse)) {
          matches.forEach(match => {
            if (!matchDays[date]) {
                matchDays[date] = [];
            }
            // TODO: style this better -- time to the right and competition in the top right somehow?
            matchDays[date].push(
                <ListGroup.Item> 
                    <Image className='player-img' src={match.playerImage} fluid roundedCircle/>
                    <span className='match-info'> 
                        {match.homeTeam === match.team ? <b>{match.homeTeam}</b> : match.homeTeam}
                        &nbsp;vs.&nbsp;     
                        {match.awayTeam === match.team ? <b>{match.awayTeam}</b> : match.awayTeam}
                        ,&nbsp;{match.time} ({match.competition})
                    </span>
                </ListGroup.Item>)
          });
          
      }
      const sortedMatchDays = Object.keys(matchDays).sort();
      const res = [];
      sortedMatchDays.forEach(date => {
          res.push(
            <Card>
                <Card.Header className='date-header'>
                    {new Date(date).toLocaleDateString()}
                </Card.Header>
                <ListGroup className='matches-container'>
                    {matchDays[date]}
                </ListGroup>
            </Card>
          );
      });
      return res;
  }


  return (
      <div>
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand>Americans Abroad</Navbar.Brand>
        </Navbar>
        <div className='schedule-container'>
            {apiResponse && generateMatchDays()}
        </div>
      </div>
  )
}

export default Schedule;