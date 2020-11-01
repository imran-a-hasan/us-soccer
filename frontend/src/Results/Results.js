import React, {useEffect, useState} from 'react';
import {Badge, Card, Image, ListGroup} from 'react-bootstrap';
import '../css/schedule.css';
const moment = require('moment');

function Results({month}) {
    const [results, setResults] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:9000/results?month=${month}`)
        .then(res => res.json())
        .then(res => {
            setResults(res);
        });
    }, [month]);

    function getGoals(count) {
        let res = [];
        for (let i = 0; i < count; i++) {
            res.push(<span role='img'>&#9917;</span>);
        }
        return res;
    }

    function getAssists(count) {
        let res = [];
        for (let i = 0; i < count; i++) {
            res.push(<span role='img'>&#x1F170;</span>);
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
                const matchDateTimeZone = moment(date + " " + match.time).format('YYYY-MM-DD')
                const matchDate = date === matchDateTimeZone ? date : matchDateTimeZone;    
                matchDays[matchDate].push(
                    <ListGroup.Item> 
                        <div className='match-competition'><Badge pill variant='dark'>{match.competition}</Badge></div>
                        <div>
                            <Image className='player-img' src={`data:image/png;base64,${match.playerImage}`} roundedCircle />
                            <span className='match-info'> 
                                <span className='home-team'>
                                    <span className='home-team-name'>{match.homeTeam === match.team ? <b>{match.homeTeam}</b> : match.homeTeam}</span>
                                    <Image className='home-team-img' src={match.homeTeamImage} />
                                </span>
                                <span className='match-score'>{match.homeTeamScore} - {match.awayTeamScore}</span>
                                <span className='away-team'>
                                    <Image className='away-team-img' src={match.awayTeamImage} />
                                    <span className='away-team-name'>{match.awayTeam === match.team ? <b>{match.awayTeam}</b> : match.awayTeam}</span>                      
                                </span> 
                            </span>
                            {match.minutes !== 0 ? <span className='minutes'>{match.minutes}'</span> : null}
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
            if (matchDays[date].length != 0) {
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
            }
        });
        return res;   
    
    }

    return (
        <div>
            <div className='results-container'>
                {results && generateResults()}
            </div>
        </div>   
    );
}

export default Results;