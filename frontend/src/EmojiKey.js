import React from 'react';

function EmojiKey() {
    return (
        <div className='emoji-key'>
            <span className='minutes-key'></span> - minutes played
            <div><span role='img' aria-label='bench'>&#x1FA91;</span> - bench</div> 
            <div><span role='img' aria-label='not in squad'>&#x274C;</span> - not in squad</div>
            <div><span role='img' aria-label='goal'>&#9917;</span> - goal</div>
            <div><span role='img' aria-label='assist'>&#x1F170;</span> - assist</div>
        </div>
    );
}

export default EmojiKey;