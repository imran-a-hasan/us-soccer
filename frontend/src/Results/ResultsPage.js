import React from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import Results from './Results';
import MONTHS from '../constants/months';
import useDate from '../useDate';

function ResultsPage() {

    const {month, setMonth, year, prevMonth, nextMonth } = useDate();

    return (
        <div>
            <ButtonToolbar className='month-container'>
                <span className='month-nav'>
                    <Button className='month-button' variant='left' onClick={() => setMonth(prevMonth(month))} disabled={month === 9}>&lsaquo;</Button>
                    <span className='month-title'>{MONTHS[month]} {year}</span>
                    <Button className='month-button' variant='right' onClick={() => setMonth(nextMonth(month))} disabled={month === new Date().getMonth() + 1}>&rsaquo;</Button>
                </span>
            </ButtonToolbar>
            <Results month={month}/>
        </div>
);
}

export default ResultsPage;