import React, {useEffect, useState} from 'react';
import {Badge, Card, Image, ListGroup} from 'react-bootstrap';
import PlayerImage from '../PlayerImage';
import MatchVideos from './MatchVideos';
const moment = require('moment');

function Results({month, date}) {
    const[results, setResults] = useState(null);
    useEffect(() => {
        if (Number.isInteger(month)) {
            fetch(`https://f07ibfl0dg.execute-api.us-east-1.amazonaws.com/GetResults?month=${month}`)
            .then(res => res.json())
            .then(res => {
                setResults(res);
            });
        } else if (date) {
            fetch(encodeURI(`https://f07ibfl0dg.execute-api.us-east-1.amazonaws.com/GetResultsByDate?timestamp=${date.format('YYYY-MM-DD HH:mm:ssZ')}`))
            .then(res => res.json())
            .then(res => {
                setResults(res);
            });
        }
    }, [month, date]);

    function getGoals(key, count) {
        let res = [];
        for (let i = 0; i < count; i++) {
            res.push(<span key={`goal-${key}-${count}`} role='img' aria-label='goal'>&#9917;</span>);
        }
        return res;
    }

    function getAssists(key, count) {
        let res = [];
        for (let i = 0; i < count; i++) {
            res.push(<span key={`assist-${key}-${count}`}role='img' aria-label='assist'>&#x1F170;</span>);
        }
        return res;
    }

    function generateResults() {
        const matchDays = {};
        let key = 0;
        results.forEach(resultsObj => {
            const date = resultsObj.date;
            const matches = resultsObj.matches;  
            matches.forEach(match => {
                const matchDateTimeZone = moment(date + " " + match.time).format('YYYY-MM-DD')
                const matchDate = date === matchDateTimeZone ? date : matchDateTimeZone;    
                if (!matchDays[matchDate]) {
                    matchDays[matchDate] = [];
                }
                console.log(match);
                matchDays[matchDate].push(
                    <ListGroup.Item key={`result-${key}`}> 
                        <div className='match-competition'><Badge pill variant='dark'>{match.competition}</Badge></div>
                        <div className='match-info-container'>
                            <PlayerImage imageId={match.imageId} matchId={match.playerId} playerName={match.player}/>
                            <span className='match-info'> 
                                <span className='home-team'>
                                    <span className='home-team-name'>{match.atHome ? <b>{match.homeTeam}</b> : match.homeTeam}</span>
                                    <Image className={`home-team-img ${match.atHome ? 'player-team-img' : null}`} src={match.homeTeamImage} />
                                </span>
                                <span className='match-score'>{match.homeTeamScore} - {match.awayTeamScore}</span>
                                <span className='away-team'>
                                    <Image className={`away-team-img ${!match.atHome ? 'player-team-img' : null}`} src={match.awayTeamImage} />
                                    <span className='away-team-name'>{!match.atHome ? <b>{match.awayTeam}</b> : match.awayTeam}</span>                      
                                </span> 
                            </span>
                            {match.minutes && match.minutes !== 0 ? <span className='minutes'>{match.minutes}</span> : null}
                            {(match.minutes === null || match.minutes === 0) && match.inSquad ? <span className='bench' role='img' aria-label='bench'>&#x1FA91;</span> : null}
                            {!match.inSquad ? <span className='not-in-squad' role='img' aria-label='not in squad'>&#x274C;</span> : null}
                            <span className='goals'>{getGoals(key, match.goals)}</span>
                            <span className='assists'>{getAssists(key, match.assists)}</span>
                        </div>
                        <MatchVideos matchId={match.matchId} />
                    </ListGroup.Item>
                );
                key++;
            });
        });
        const res = [];
        Object.keys(matchDays).forEach(date => {
            const dateObj = new Date(date);
            if (matchDays[date].length !== 0) {
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
                
            }
        });
        return res;   
    }

    if (results && results.length !== 0) {
        return (
            <div className='results-container'>
                {results && generateResults()}
            </div>
        );
    } else {
        return null;
    }
    
}

export default Results;