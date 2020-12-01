import React, {useEffect, useState} from 'react';
import {Badge, Card,  Image, ListGroup} from 'react-bootstrap';
import PlayerImage from '../PlayerImage';
const moment = require('moment');

function Schedule({month, date}) {
  
    const[schedule, setSchedule] = useState(null);
    useEffect(() => {   
        if (Number.isInteger(month)) {
            fetch(`https://f07ibfl0dg.execute-api.us-east-1.amazonaws.com/GetSchedule?month=${month}`)
            .then(res => res.json())
            .then(res => {
                setSchedule(res);
            });
        } else if (date) {
            fetch(encodeURI(`https://f07ibfl0dg.execute-api.us-east-1.amazonaws.com/GetScheduleByDate?timestamp=${date.format('YYYY-MM-DD HH:mm:ssZ')}`))
            .then(res => res.json())
            .then(res => {
                setSchedule(res);
            });
        }
    }, [month, date]);

  function generateMatchDays() {
      const matchDays = {};
      let key = 0;
      schedule.forEach(scheduleObj => {
          const date = scheduleObj.date;
          const matches = scheduleObj.matches;
          matches.forEach(match => {
            var offset = new Date(date).getTimezoneOffset();
            const matchTimeMoment = moment(match.time.toLowerCase(), 'hh:mm:ss a');
            const matchTime = matchTimeMoment.minutes(matchTimeMoment.minutes() - offset).format('h:mm A');
            const matchDateTimeZone = moment(date + " " + match.time).format('YYYY-MM-DD')
            const matchDate = date === matchDateTimeZone ? date : matchDateTimeZone;
            if (!matchDays[matchDate]) {
                matchDays[matchDate] = [];
            }

            const matchDateMoment = (moment(matchDate).hours(matchTimeMoment.hours()).minutes(matchTimeMoment.minutes()));
            const minutesDiff = moment().diff(matchDateMoment, 'minutes');

            let isLive = false;
            if (minutesDiff >= 0) {
                isLive = true;
            }
            if (minutesDiff < 120) {
                matchDays[matchDate].push(
                    <ListGroup.Item key={`schedule-${key}`}> 
                        <div className='match-competition'><Badge pill variant='dark'>{match.competition}</Badge></div>
                        <div>
                            <PlayerImage imageId={match.imageId} matchId={match.playerId} playerName={match.player}/>
                            <span className='match-info'> 
                                <span className='home-team'>
                                    <span className='home-team-name'>{match.atHome ? <b>{match.homeTeam}</b> : match.homeTeam}</span>
                                    <Image className={`home-team-img ${match.atHome ? 'player-team-img' : null}`} src={match.homeTeamImage} />
                                </span>
                                <span className='match-vs'>vs.</span>   
                                <span className='away-team'>
                                    <Image className={`away-team-img ${!match.atHome ? 'player-team-img' : null}`} src={match.awayTeamImage} />
                                    <span className='away-team-name'>{!match.atHome ? <b>{match.awayTeam}</b> : match.awayTeam}</span>                      
                                </span> 
                            </span>
                            {isLive ? <Badge pill variant='dark'>LIVE</Badge> : <Badge className='match-time' pill variant='info'>{matchTime}</Badge>}
                        </div>
                    </ListGroup.Item>
                );
            }
            key++;
          }); 
      });
      const res = [];
      Object.keys(matchDays).forEach(date => {
          const dateObj = new Date(date);
          if (Number.isInteger(month)) {
            res.push(
                <Card key={date}>
                    <Card.Header className='date-header'>
                        {`${dateObj.getUTCMonth() + 1}/${dateObj.getUTCDate()}/${dateObj.getFullYear()}`}
                    </Card.Header>
                    <ListGroup className='matches-container'>
                        {matchDays[date]}
                    </ListGroup>
                </Card>
              );
          } else {
            res.push(
                <ListGroup className='matches-container' key={date}>
                    {matchDays[date]}
                </ListGroup>
            );
          }
      });
      return res;
  }

  if (schedule && schedule.length !== 0) {
    return (
        <div className='schedule-container'>
            {schedule && generateMatchDays()}
        </div>
      );
  } else {
      return null;
  }
  
}

export default Schedule;