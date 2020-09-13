import React, {useState} from 'react';
import {Accordion, Button, Card, ListGroup} from 'react-bootstrap';
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
            matchDays[date].push(<ListGroup.Item>{match.player}: {match.team} vs. {match.opponent} [{match.home ? 'H' : 'A'}], {match.time} ({match.competition})</ListGroup.Item>)
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
                <ListGroup variant='flush'>
                    {matchDays[date]}
                </ListGroup>
            </Card>
          );
      });
      return res;
  }


  return (
      <div className='schedule-container'>
          {apiResponse && generateMatchDays()}
      </div>
  )
}

export default Schedule;