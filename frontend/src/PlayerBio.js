import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Badge, Image, Table } from 'react-bootstrap';

function PlayerBio() {
    let { id } = useParams();

    const[stats, setStats] = useState(null);
    const[results, setResults] = useState(null);

    useEffect(() => {   
        fetch(`https://f07ibfl0dg.execute-api.us-east-1.amazonaws.com/GetPlayer?player=${id}`)
        .then(res => res.json())
        .then(res => {
            setStats(res);
        });
    }, [id]);

    useEffect(() => {   
        fetch(`https://f07ibfl0dg.execute-api.us-east-1.amazonaws.com/GetPlayerResults?player=${id}`)
        .then(res => res.json())
        .then(res => {
            setResults(res);
        });
    }, [id]);

    function showStats() {
        return (
            <div>
                <div className='player-bio-header-container'>
                    <Image className='player-img' src={`/images/${stats.imageId}.png`} roundedCircle />
                    <span className='player-bio-name'>{stats.playerName}</span>
                    <span className='player-bio-team-container'>
                        <Badge pill variant='dark' className='player-bio-team-name'>{stats.teamName}</Badge>
                        <Image className='player-bio-team-img' src={stats.teamImage} />
                    </span>       
                </div>
                <div className='player-stats-container'>
                    <span>
                        <div className='stat-header'>
                            Games
                        </div>
                        <div className='stat-data'>
                            {stats.appearances}
                        </div>
                    </span>
                    <span>
                        <div className='stat-header'>
                            Minutes
                        </div>
                        <div className='stat-data'>
                            {stats.minutesPlayed}
                        </div>
                    </span>
                    <span>
                        <div className='stat-header'>
                            Goals
                        </div>
                        <div className='stat-data'>
                            {stats.goals}
                        </div>
                    </span>
                    <span>
                        <div className='stat-header'>
                            Assists
                        </div>
                        <div className='stat-data'>
                            {stats.assists}
                        </div>
                    </span>
                </div>   
            </div>
        );
    }

    const createTable = rows => {
        return (
            <Table className='results-table'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Opponent</th>
                        <th>Result</th>
                        <th><span role='img' aria-label='minutes played'>&#x23F1;</span></th>
                        <th>
                            <span role='img' aria-label='goal'>&#9917;</span>
                        </th>
                        <th>
                            <span role='img' aria-label='assist'>&#x1F170;</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }

    function showResults() {
        const rows = [];
        let count = 0;
        results.forEach(result => {
            const matchDate = new Date(result.date);
            rows.push(
                <tr key={`result-${id}-${count}`}>
                    <td>{`${matchDate.getUTCMonth() + 1}/${matchDate.getUTCDate()}/${matchDate.getFullYear()}`}</td>
                    <td>
                        <Image className='home-team-img' src={result.opponentLogo} />
                    </td>
                    <td>{result.teamScore}-{result.opponentScore}</td>
                    <td>{result.minutesPlayed ?? 0}</td>
                    <td>{result.goals}</td>
                    <td>{result.assists}</td>
                </tr>
            )
            count++;
        });
        return createTable(rows);
    }

    return (
        <div>
            {stats && showStats()}
            {results && showResults()}
        </div>
    );
}

export default PlayerBio;