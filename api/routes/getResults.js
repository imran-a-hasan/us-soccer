const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const { TOURNAMENT_NAMES } = require('../constants/tournaments');
const { TEAM_ID_TO_NAME } = require('../constants/teams');
const { PLAYER_NAME_TO_IMAGE_ID } = require('../constants/players');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'us_soccer'
});

connection.connect();

const createResultObject = (teamId, homeTeamId, awayTeamId, homeTeamName, awayTeamName, homeTeamScore, awayTeamScore, competition, minutes, goals, assists, player) => {
    return {
        player: player,
        imageId: PLAYER_NAME_TO_IMAGE_ID[player],
        playerImage: fs.readFileSync(path.resolve(`images/players/${PLAYER_NAME_TO_IMAGE_ID[player]}.png`), 'base64'),
        team: TEAM_ID_TO_NAME[teamId],
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeTeamImage: fs.readFileSync(path.resolve(`images/teams/${homeTeamId}.png`), 'base64'),
        awayTeamImage: fs.readFileSync(path.resolve(`images/teams/${awayTeamId}.png`), 'base64'),
        competition: competition,
        homeTeamScore: homeTeamScore,
        awayTeamScore: awayTeamScore,
        minutes: minutes,
        goals: goals,
        assists: assists
    }
}

// for each team, iterate through their results and make a list of matches (or get it from redis key team-result-[id] if we already have it)
// for each match, get score info


function getResults(req, res) {
    const month = Number(req.query.month);
    const allGames = {};
    if (month >= 1 && month <= 12) {
        connection.query(`SELECT * FROM Results WHERE month=${month}
        ORDER BY date_time ASC`, function(err, results, fields) {
            results.forEach(row => {
                const dateTime = row.date_time;
                const date = dateTime.toISOString().slice(0, 10);
                const teamId = row.team_id;
                const homeTeamId = row.home_team_id.slice(14);
                const awayTeamId = row.away_team_id.slice(14);
                const homeTeamName = row.home_team_name;
                const awayTeamName = row.away_team_name;
                const homeTeamScore = row.home_team_goals;
                const awayTeamScore = row.away_team_goals;
                const competition = TOURNAMENT_NAMES[row.competition_id] || row.competition_name;
                const minutes = row.player_minutes;
                const goals = row.player_goals;
                const assists = row.player_assists;
                const player = row.player_name;
                if (!allGames[date]) {
                    allGames[date] = [];
                }
                allGames[date].push(createResultObject(teamId, homeTeamId, awayTeamId, homeTeamName, awayTeamName, homeTeamScore, awayTeamScore, competition, minutes, goals, assists, player));
            });
            return res.status(200).send(JSON.stringify(allGames));
        });
    }

   
                

    
    
}

module.exports = getResults;