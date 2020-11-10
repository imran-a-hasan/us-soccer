import React from 'react';

function EmojiKey() {
    return (
        <div className='emoji-key'>
            <span className='minutes-key'></span> - minutes played
            <div>🪑 - bench</div>
            <div>❌ - not in squad</div>
            <div>⚽ - goal</div>
            <div>🅰 - assist</div>
        </div>
    );
}

export default EmojiKey;