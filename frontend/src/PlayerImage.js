import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Image } from 'react-bootstrap';
import PLAYER_TOOLTIPS from './constants/tooltips';

function PlayerImage({imageId}) {
    return (
        <span>
            <Image data-tip data-for={`player-${imageId}`} className='player-img' src={`/images/${imageId}.png`} roundedCircle />
            <ReactTooltip id={`player-${imageId}`} place='top' effect='solid'>
                {PLAYER_TOOLTIPS[imageId]}
            </ReactTooltip>
        </span>   
    );
}


export default PlayerImage;