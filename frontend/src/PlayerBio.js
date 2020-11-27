import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Badge, Image } from 'react-bootstrap';

function PlayerBio() {
    let { id } = useParams();

    const[stats, setStats] = useState(null);
    useEffect(() => {   
        fetch(`https://f07ibfl0dg.execute-api.us-east-1.amazonaws.com/GetPlayer?player=${id}`)
        .then(res => res.json())
        .then(res => {
            setStats(res);
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
                    <span>
                        <div className='stat-header'>
                            Minutes
                        </div>
                        <div className='stat-data'>
                            {stats.minutesPlayed}
                        </div>
                    </span>
                </div>   
            </div>
        );
    }

    return (
        <div>
            {stats && showStats()}
        </div>
    );
}

export default PlayerBio;