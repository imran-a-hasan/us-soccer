import React, { useState } from 'react';
import Schedule from './Schedule';
import MonthNav from '../MonthNav';

function SchedulePage() {
    const[month, setMonth] = useState(null);
    const onMonthChange = newMonth => {
        setMonth(newMonth);
    }

    return (
        <div>
            <MonthNav onMonthChange={onMonthChange} nextDisabled={5}/>
            <div className='content-container'>
                <Schedule month={month}/>
            </div>          
        </div>
    );
}

export default SchedulePage;