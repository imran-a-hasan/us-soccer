import React from 'react';
import ReactTooltip from 'react-tooltip';

function MatchStats({match}) {
    const isGoalkeeper = match.playerId === 47285;

    if (isGoalkeeper) {
        return (
            <ReactTooltip id={`${match.playerId}-${match.matchId}-stats`} place='bottom' effect='solid' multiline={true}>
                {match.saves !== null ? <span>Saves: {match.saves} <br /> </span>: null}
                {match.accuratePasses !== null && match.totalPasses !== null ? <span>Passes: {match.accuratePasses}/{match.totalPasses} {match.totalPasses && match.totalPasses !== 0 ? `(${Math.round(match.accuratePasses / match.totalPasses * 100)}%)` : null}<br /> </span>: null}
                {match.foulsCommitted !== null ? <span>Fouls committed: {match.foulsCommitted}<br /> </span>: null}
                {match.yellowCards !== null ? <span>Yellow cards: {match.yellowCards}<br /> </span>: null}
                {match.redCards !== null ? <span>Red cards: {match.redCards} </span>: null}
            </ReactTooltip>
        );
    } else {
        return (
            <ReactTooltip id={`${match.playerId}-${match.matchId}-stats`} place='bottom' effect='solid' multiline={true}>
                {match.totalShots !== null ? <span>Shots: {match.totalShots}<br /> </span>: null}
                {match.shotsOnGoal !== null ? <span>Shots on target: {match.shotsOnGoal}<br /> </span>: null}
                {match.accuratePasses !== null && match.totalPasses !== null ? <span>Passes: {match.accuratePasses}/{match.totalPasses} {match.totalPasses && match.totalPasses !== 0 ? `(${Math.round(match.accuratePasses / match.totalPasses * 100)}%)` : null}<br /> </span>: null}
                {match.keyPasses !== null ? <span>Key passes: {match.keyPasses}<br /> </span>: null}
                {match.accurateCrosses !== null && match.totalCrosses !== null ? <span>Crosses: {match.accurateCrosses}/{match.totalCrosses} {match.totalCrosses && match.totalCrosses !== 0 ? `(${Math.round(match.accurateCrosses / match.totalCrosses * 100)}%)` : null}<br /> </span>: null}
                {match.successfulDribbles !== null && match.totalDuels !== null ? <span>Dribbles: {match.successfulDribbles}/{match.totalDribbles} {match.totalDribbles && match.totalDribbles !== 0 ? `(${Math.round(match.successfulDribbles / match.totalDribbles * 100)}%)` : null}<br /> </span>: null}
                {match.duelsWon !== null && match.totalDuels !== null ? <span>Duels: {match.duelsWon}/{match.totalDuels} {match.totalDuels && match.totalDuels !== 0 ? `(${Math.round(match.duelsWon / match.totalDuels * 100)}%)` : null}<br /> </span>: null}
                {match.aerialsWon !== null ? <span>Aerials won: {match.aerialsWon}<br /> </span>: null}
                {match.tackles !== null ? <span>Tackles: {match.tackles}<br /> </span>: null}
                {match.interceptions !== null ? <span>Interceptions: {match.interceptions}<br /> </span>: null}
                {match.clearances !== null ? <span>Clearances: {match.clearances}<br /> </span>: null}
                {match.dispossessed !== null ? <span>Dispossessed: {match.dispossessed}<br /> </span>: null}
                {match.foulsDrawn !== null ? <span>Fouls drawn: {match.foulsDrawn}<br /> </span>: null}
                {match.foulsCommitted !== null ? <span>Fouls committed: {match.foulsCommitted}<br /> </span>: null}
                {match.yellowCards !== null ? <span>Yellow cards: {match.yellowCards}<br /> </span>: null}
                {match.redCards !== null ? <span>Red cards: {match.redCards} </span>: null}
            </ReactTooltip>
        );
    }
}

export default MatchStats;