import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
const moment = require('moment');

function DateNav({ onDateChange }) {

    const [date, setDate] = useState(moment());

    useEffect(() => {
        onDateChange(date);
    }, [date, onDateChange]);

    return (
        <ButtonToolbar className='month-container'>
            <span className='month-nav'>
                <Button className='month-button' variant='left' onClick={() => setDate(moment(date.subtract(1, 'day')))} disabled={date.month() === 9 && date.date() === 1}>&lsaquo;</Button>
                <span className='month-title'>{date.format("MM/DD/YYYY")}</span>
                <Button className='month-button' variant='right' onClick={() => setDate(moment(date.add(1, 'day')))} disabled={date.month() === 5 && date.date() === 31}>&rsaquo;</Button>
            </span>
        </ButtonToolbar>
    );
}

export default DateNav;