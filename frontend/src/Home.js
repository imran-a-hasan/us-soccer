import React, { useEffect, useRef, useState } from 'react';
import Schedule from './Schedule/Schedule';
import Results from './Results/Results';
import MonthNav from './MonthNav';
import EmojiKey from './EmojiKey';
import { useSwipeable } from 'react-swipeable';
import useDate from './hooks/useDate';

function Home() { 
    const scheduleRef = useRef(null);
    useEffect(() => {
        if (scheduleRef && scheduleRef.current) {
            setTimeout(() => {
                scheduleRef.current.scrollIntoView({behavior: 'smooth'});
            }, 500);
        }
    });

    const {prevMonth, nextMonth} = useDate();

    const handlers = useSwipeable({
        onSwipedLeft: () => setMonth(nextMonth(month)),
        onSwipedRight: () => setMonth(prevMonth(month))
    });

    const[month, setMonth] = useState(null);
    const onMonthChange = newMonth => {
        setMonth(newMonth);
    }

    return (
        <div {...handlers}>
            <MonthNav onMonthChange={onMonthChange} nextDisabled={5} />
            <div className='content-container'>
                <Results month={month}/>
                <div ref={scheduleRef}>
                    <Schedule month={month}/>
                </div>
            </div>
            <EmojiKey />
        </div>
    );
}

export default Home;