import React, {useState} from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import Results from './Results';
import { useParams } from 'react-router-dom';
import MONTHS from '../constants/months';

function ResultsPage() {
    const [month, setMonth] = useState(useParams().month);
    const[year, setYear] = useState(2020);
    if (!month) {
        setMonth(new Date().getMonth() + 1);
    }
    if (month < 9) {
        setYear(2021);
    }

    const prevMonth = month => {
        if (month == 1) {
            return 12;
        } else {
            return month - 1;
        }
    }

    const nextMonth = month => {
        if (month == 12) {
            return 1;
        } else {
            return month + 1;
        }
    }

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
        </div>
);
}

export default ResultsPage;