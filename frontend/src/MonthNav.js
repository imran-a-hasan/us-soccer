import React, { useEffect } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import MONTHS from './constants/months';
import useDate from './hooks/useDate';

function MonthNav({onMonthChange, prevDisabled = 8, nextDisabled}) {
    const {month, setMonth, year, prevMonth, nextMonth } = useDate();

    useEffect(() => {
        onMonthChange(month);
    }, [month, onMonthChange]);

    return (
        <ButtonToolbar className='month-container'>
            <span className='month-nav'>
                <Button className='month-button' variant='left' onClick={() => setMonth(prevMonth(month))} disabled={month === prevDisabled}>&lsaquo;</Button>
                <span className='month-title'>{MONTHS[month]} {year}</span>
                <Button className='month-button' variant='right' onClick={() => setMonth(nextMonth(month))} disabled={month === nextDisabled}>&rsaquo;</Button>
            </span>
        </ButtonToolbar>
    );
}

export default MonthNav;

