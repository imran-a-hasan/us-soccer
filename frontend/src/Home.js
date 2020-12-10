import React, { useEffect, useState } from 'react';
import Schedule from './Schedule/Schedule';
import Results from './Results/Results';
import EmojiKey from './EmojiKey';
import DateNav from './DateNav';
import { Spinner } from 'react-bootstrap';

function Home() { 

    const [date, setDate] = useState(null);
    const onDateChange = newDate => {
        setDate(newDate);
    }

    const [waitToShowNoGames, setWaitToShowNoGames] = useState(false);

    useEffect(() => {
         setTimeout(() => {
             setWaitToShowNoGames(true);
         }, 1500);
     }, []);

    const results = Results({date});
    const schedule = Schedule({date});

    

    return (
        <div>
            <DateNav onDateChange={onDateChange}/>
            <div className='content-container'>
                {results}
                {schedule}
                {!results && !schedule && (waitToShowNoGames ? <span className='no-games'>No games today :(</span> : <Spinner className='loading' animation='border' />)}
            </div>
            <EmojiKey />
        </div>
    );
}

export default Home;