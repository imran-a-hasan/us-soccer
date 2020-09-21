import React from 'react';
import Schedule from './Schedule/Schedule';
import Results from './Results/Results';
import {ButtonToolbar, Button} from 'react-bootstrap';
import MONTHS from './constants/months';
import useDate from './useDate';

function Home() {
    
    const {month, setMonth, year, prevMonth, nextMonth } = useDate();

    return (
        <div>
            <ButtonToolbar className='month-container'>
                <span className='month-nav'>
                    <Button className='month-button' variant='left' onClick={() => setMonth(prevMonth(month))} disabled={month === 9}>&lsaquo;</Button>
                    <span className='month-title'>{MONTHS[month]} {year}</span>
                    <Button className='month-button' variant='right' onClick={() => setMonth(nextMonth(month))} disabled={month === 5}>&rsaquo;</Button>
                </span>
            </ButtonToolbar>
            <Results month={month}/>
            <Schedule month={month}/>
        </div>
    );
}

export default Home;