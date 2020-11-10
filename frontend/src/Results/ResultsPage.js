import React, { useState } from 'react';
import Results from './Results';
import MonthNav from '../MonthNav';
import EmojiKey from '../EmojiKey';

function ResultsPage() {
    const[month, setMonth] = useState(null);
    const onMonthChange = newMonth => {
        setMonth(newMonth);
    }

    return (
        <div>
            <MonthNav onMonthChange={onMonthChange} 
                nextDisabled={new Date().getMonth() + 1}
                />
            <div className='content-container'>
                <Results month={month}/>
            </div>            
            <EmojiKey />
        </div>
);
}

export default ResultsPage;