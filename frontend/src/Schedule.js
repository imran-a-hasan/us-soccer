import React, {useState} from 'react';
import {Badge, Card, Image, ListGroup, Navbar} from 'react-bootstrap';
import './css/schedule.css';

function Schedule() {
  const [schedule, setSchedule] = useState(null);
  const [playerImages, setPlayerImages] = useState({});

  if (!schedule) {
    fetch("http://localhost:9000/schedule")
      .then(res => res.json())
      .then(res => {
          setSchedule(res);
      });
  }

  const getPlayerImage = imageId => {
    console.log(playerImages);
    if (playerImages[imageId]) {
        console.log(playerImages[imageId]);
        return playerImages[imageId];
    } else {
        fetch(`http://localhost:9000/player-image/${imageId}`)
            .then(res => res.blob())
            .then(img => {
                if (!playerImages[imageId]) {
                    const imageObj = URL.createObjectURL(img);
                    setPlayerImages({...playerImages, [imageId]: imageObj});
                }
      });
    }
  }

  function generateMatchDays() {
      const matchDays = {};
      for (let [date, matches] of Object.entries(schedule)) {
          matches.forEach(match => {
            if (!matchDays[date]) {
                matchDays[date] = [];
            }
            // TODO: move match info to component
            // TODO: paginate by month
            // TODO: style this better -- time to the right and competition in the top right somehow?
            matchDays[date].push(
                <ListGroup.Item> 
                    <div className='match-competition'><Badge pill variant='dark'>{match.competition}</Badge></div>
                    <div className='match-container'>
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
                        <Badge className='match-time'>{match.time}</Badge>
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


  return (
      <div>
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand>Americans Abroad</Navbar.Brand>
        </Navbar>
        <div className='schedule-container'>
            {schedule && generateMatchDays()}
        </div>
      </div>
  )
}

export default Schedule;