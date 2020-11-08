import React, { useEffect, useRef, useState } from 'react';
import Schedule from './Schedule/Schedule';
import Results from './Results/Results';
import MonthNav from './MonthNav';

function Home() { 
    const scheduleRef = useRef(null);
    useEffect(() => {
        if (scheduleRef && scheduleRef.current) {
            setTimeout(() => {
                scheduleRef.current.scrollIntoView({behavior: 'smooth'});
            }, 500);
        }
    });

    const[month, setMonth] = useState(null);
    const onMonthChange = newMonth => {
        setMonth(newMonth);
    }

    return (
        <div>
            <MonthNav onMonthChange={onMonthChange} nextDisabled={5} />
            <div className='content-container'>
                <Results month={month}/>
                <div ref={scheduleRef}>
                    <Schedule month={month}/>
                </div>
            </div>
        </div>
    );
}

export default Home;