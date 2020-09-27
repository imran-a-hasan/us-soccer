import {useState} from 'react';

function useDate() {
    const date = new Date();
    const [month, setMonth] = useState(date.getMonth() + 1);
    const[year, setYear] = useState(date.getFullYear());

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

    return {
        month,
        setMonth,
        year,
        prevMonth,
        nextMonth
    };
}


export default useDate;