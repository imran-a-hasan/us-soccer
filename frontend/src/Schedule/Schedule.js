import React, {useEffect, useState} from 'react';
import {Badge, Card,  Image, ListGroup} from 'react-bootstrap';
import '../css/schedule.css';

function Schedule({month}) {
  
    const [results, setResults] = useState(null);
    const [schedule, setSchedule] = useState(null);
    

    useEffect(() => {
        fetch(`http://localhost:9000/schedule?month=${month}`)
        .then(res => res.json())
        .then(res => {
            setSchedule(res);
        });
        fetch(`http://localhost:9000/results?month=${month}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setResults(res);
        });
    }, [month]);
    

    function getGoals(count) {
        let res = [];
        for (let i = 0; i < count; i++) {
            res.push(<span>&#9917;</span>);
        }
        return res;
    }

    function getAssists(count) {
        let res = [];
        for (let i = 0; i < count; i++) {
            res.push(<span>&#x1F170;</span>);
        }
        return res;
    }

    function generateResults() {
        const matchDays = {};
        for (let [date, matches] of Object.entries(results)) {
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
                                <span className='match-score'>{match.homeTeamScore} - {match.awayTeamScore}</span>
                                <span className='away-team'>
                                    <Image className='away-team-img' src={`data:image/png;base64,${match.awayTeamImage}`} roundedCircle />
                                    <span className='away-team-name'>{match.awayTeam === match.team ? <b>{match.awayTeam}</b> : match.awayTeam}</span>                      
                                </span> 
                            </span>
                            <span className='goals'>{getGoals(match.goals)}</span>
                            <span className='assists'>{getAssists(match.assists)}</span>
                        </div>
                    </ListGroup.Item>
                )
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