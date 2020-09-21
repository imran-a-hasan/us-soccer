import React, {useState} from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import Schedule from './Schedule';
import MONTHS from '../constants/months';

function SchedulePage() {
    
    const prevMonth = month => {
        if (month === 1) {
            setYear(year - 1);
            return 12;
        } else {
            return month - 1;
        }
    }
  
    const nextMonth = month => {
        if (month === 12) {
            setYear(year + 1);
            return 1;
        } else {
            return month + 1;
        }
    }

    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const[year, setYear] = useState(2020);
    if (!month) {
        setMonth(new Date().getMonth() + 1);
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
            <Schedule month={month}/>
        </div>
    );
}

export default SchedulePage;