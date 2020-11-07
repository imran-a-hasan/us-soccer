import React, {useEffect, useState} from 'react';
import {Badge, Card,  Image, ListGroup} from 'react-bootstrap';
import '../css/schedule.css';
const moment = require('moment');

function Schedule({month}) {
  
    const[schedule, setSchedule] = useState(null);
    useEffect(() => {   
        if (Number.isInteger(month)) {
            fetch(`https://f07ibfl0dg.execute-api.us-east-1.amazonaws.com/GetSchedule?month=${month}`)
            .then(res => res.json())
            .then(res => {
                setSchedule(res);
            });
        }
    }, [month]);

  function generateMatchDays() {
      const matchDays = {};
      for (let [date, matches] of Object.entries(schedule)) {
          matches.forEach(match => {
            if (!matchDays[date]) {
                matchDays[date] = [];
            }
            var offset = new Date(date).getTimezoneOffset();
            const matchMoment = moment(match.time.toLowerCase(), 'hh:mm:ss a');
            const matchTime = matchMoment.minutes(matchMoment.minutes() - offset).format('h:mm A');
            const matchDateTimeZone = moment(date + " " + match.time).format('YYYY-MM-DD')
            const matchDate = date === matchDateTimeZone ? date : matchDateTimeZone;
            console.log(`${match.imageId}.png`);
            matchDays[matchDate].push(
                <ListGroup.Item> 
                    <div className='match-competition'><Badge pill variant='dark'>{match.competition}</Badge></div>
                    <div>
                        <Image className='player-img' src={`/images/${match.imageId}.png`} roundedCircle />
                        <span className='match-info'> 
                            <span className='home-team'>
                                <span className='home-team-name'>{match.homeTeam === match.team ? <b>{match.homeTeam}</b> : match.homeTeam}</span>
                                <Image className='home-team-img' src={match.homeTeamImage} />
                            </span>
                            <span className='match-vs'>vs.</span>   
                            <span className='away-team'>
                                <Image className='away-team-img' src={match.awayTeamImage} />
                                <span className='away-team-name'>{match.awayTeam === match.team ? <b>{match.awayTeam}</b> : match.awayTeam}</span>                      
                            </span> 
                        </span>
                        <Badge className='match-time' pill variant='info'>{matchTime}</Badge>
                    </div>
                </ListGroup.Item>)
          });
          
      }
      const res = [];
      Object.keys(matchDays).forEach(date => {
          const dateObj = new Date(date);
          res.push(
            <Card>
                <Card.Header className='date-header'>
                    {`${dateObj.getUTCMonth() + 1}/${dateObj.getUTCDate()}/${dateObj.getFullYear()}`}
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
    <div className='schedule-container'>
        {schedule && generateMatchDays()}
    </div>
  );
}

export default Schedule;