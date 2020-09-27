import React from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import Schedule from './Schedule';
import MONTHS from '../constants/months';
import useDate from '../hooks/useDate';

function SchedulePage() {
    
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
            <Schedule month={month}/>
        </div>
    );
}

export default SchedulePage;