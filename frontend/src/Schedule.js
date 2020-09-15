import React, {useEffect, useState} from 'react';
import {Badge, Button, ButtonToolbar, Card, Carousel, Image, ListGroup, Navbar} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import MONTHS from './constants/months';
import './css/schedule.css';

function Schedule() {

  const [schedule, setSchedule] = useState(null);
  const [month, setMonth] = useState(useParams().month);
  if (!month) {
    setMonth(new Date().getMonth() + 1);
  }


    useEffect(() => {
        fetch(`http://localhost:9000/schedule?month=${month}`)
        .then(res => res.json())
        .then(res => {
            setSchedule(res);
        });
    }, [month]);

  function generateMatchDays() {
      const matchDays = {};
      for (let [date, matches] of Object.entries(schedule)) {
          matches.forEach(match => {
            if (!matchDays[date]) {
                matchDays[date] = [];
            }
            matchDays[date].push(
                <ListGroup.Item> 
                    <div className='match-competition'><Badge pill variant='dark'>{match.competition}</Badge></div>
                    <div>
                        <Image className='player-img' src={`data:image/png;base64,${match.playerImage}`} roundedCircle />
                        <span className='match-info'> 
                            <span className='home-team'>
                                <span className='home-team-name'>{match.homeTeam === match.team ? <b>{match.homeTeam}</b> : match.homeTeam}</span>
                                <Image className='home-team-img' src={`data:image/png;base64,${match.homeTeamImage}`} roundedCircle />
                            </span>
                            <span className='match-vs'>vs.</span>   
                            <span className='away-team'>
                                <Image className='away-team-img' src={`data:image/png;base64,${match.awayTeamImage}`} roundedCircle />
                                <span className='away-team-name'>{match.awayTeam === match.team ? <b>{match.awayTeam}</b> : match.awayTeam}</span>                      
                            </span> 
                        </span>
                        <Badge className='match-time' pill variant='info'>{match.time}</Badge>
                    </div>
                </ListGroup.Item>)
          });
          
      }
      const res = [];
      Object.keys(matchDays).forEach(date => {
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

  const prevMonth = month => {
      if (month == 1) {
          return 12;
      } else {
          return month - 1;
      }
  }

  const nextMonth = month => {
      if (month == 12) {
          return 1;
      } else {
          return month + 1;
      }
  }

  return (
      <div>
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand>Americans Abroad</Navbar.Brand>
        </Navbar>
        <ButtonToolbar className='month-container'>
            <span className='month-nav'>
                <Button className='month-button' variant='left' onClick={() => setMonth(prevMonth(month))} disabled={month === 9}>&lsaquo;</Button>
                <span className='month-title'>{MONTHS[month]}</span>
                <Button className='month-button' variant='right' onClick={() => setMonth(nextMonth(month))} disabled={month === 5}>&rsaquo;</Button>
            </span>
        </ButtonToolbar>
        <div className='schedule-container'>
            {schedule && generateMatchDays()}
        </div>
      </div>
  )
}

export default Schedule;