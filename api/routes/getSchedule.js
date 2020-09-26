var fs = require('fs');
var path = require('path');
const mysql = require('mysql');
const moment = require('moment');
const teamConstants = require('../constants/teams');
const playerConstants = require('../constants/players');
const TEAM_ID_TO_NAME = teamConstants.TEAM_ID_TO_NAME;
const PLAYER_NAME_TO_ID = playerConstants.PLAYER_NAME_TO_ID;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'us_soccer'
});

connection.connect();

const createMatchObject = (time, teamId, homeTeamId, awayTeamId, homeTeamName, awayTeamName, player, competition) => {
    return {
        time: time,
        player: player,
        imageId: PLAYER_NAME_TO_ID[player],
        playerImage: fs.readFileSync(path.resolve(`images/players/${PLAYER_NAME_TO_ID[player]}.png`), 'base64'),
        team: TEAM_ID_TO_NAME[teamId],
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeTeamImage: fs.readFileSync(path.resolve(`images/teams/${homeTeamId}.png`), 'base64'),
        awayTeamImage: fs.readFileSync(path.resolve(`images/teams/${awayTeamId}.png`), 'base64'),
        competition: competition
    }
}

function getSchedule(req, res) {
    const month = Number(req.query.month);
    const allGames = {};
    const dateTime = moment().hour(moment().hour() - 2).format('YYYY-MM-DD HH:mm:ss');
    if (month >= 1 && month <= 12) {
        connection.query(`SELECT * FROM Schedule WHERE month=${month} AND date_time >= \"${dateTime}\"
        ORDER BY date_time ASC`, function(err, results, fields) {
            results.forEach(row => {
                const dateTime = row.date_time;
                const date = dateTime.toISOString().slice(0, 10);
                const time = dateTime.toLocaleTimeString();
                const teamId = row.team_id;
                const homeTeamId = row.home_team_id.slice(14);
                const awayTeamId = row.away_team_id.slice(14);
                const homeTeamName = row.home_team_name;
                const awayTeamName = row.away_team_name;
                const competition = row.competition_name;
                const player = row.player_name;
                if (!allGames[date]) {
                    allGames[date] = [];
                }
                allGames[date].push(createMatchObject(time, teamId, homeTeamId, awayTeamId, homeTeamName, awayTeamName, player, competition));
            });
            return res.status(200).send(JSON.stringify(allGames));
        });
    }
    
    
}

module.exports = getSchedule;