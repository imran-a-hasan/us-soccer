const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const moment = require('moment');
const { TOURNAMENT_NAMES } = require('../constants/tournaments');
const { TEAM_ID_TO_NAME, SM_TEAM_ID_TO_NAME } = require('../constants/teams');
const { PLAYER_NAME_TO_IMAGE_ID } = require('../constants/players');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'us_soccer'
});

connection.connect();

const createMatchObject = (time, teamId, homeTeamId, awayTeamId, homeTeamName, awayTeamName, player, competition, homeTeamLogo, awayTeamLogo) => {
    return {
        time: time,
        player: player,
        imageId: PLAYER_NAME_TO_IMAGE_ID[player],
        playerImage: fs.readFileSync(path.resolve(`images/players/${PLAYER_NAME_TO_IMAGE_ID[player]}.png`), 'base64'),
        team: SM_TEAM_ID_TO_NAME[teamId],
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeTeamImage: homeTeamLogo,
        awayTeamImage: awayTeamLogo,
        competition: competition
    }
}

function getSchedule(req, res) {
    const month = Number(req.query.month);  
    if (month >= 1 && month <= 12) {
        const allGames = {};
        const cutoff = moment.utc().format('YYYY-MM-DD HH:mm:ss');
        connection.query(`SELECT * FROM Schedule2 WHERE month=${month} AND date_time >= \"${cutoff}\"
        ORDER BY date_time ASC`, function(err, results, fields) {
            results.forEach(row => {
                const dateTime = moment.utc(row.date_time);
                const date = dateTime.format().slice(0, 10);
                const time = dateTime.format('HH:mm:ssZ');
                const teamId = row.team_id;
                const homeTeamId = row.home_team_id.slice(14);
                const awayTeamId = row.away_team_id.slice(14);
                const homeTeamName = row.home_team_name;
                const awayTeamName = row.away_team_name;
                const competition = TOURNAMENT_NAMES[row.competition_id] || row.competition_name;
                const player = row.player_name;
                const homeTeamLogo = row.home_team_logo;
                const awayTeamLogo = row.away_team_logo;
                if (!allGames[date]) {
                    allGames[date] = [];
                }
                allGames[date].push(createMatchObject(time, teamId, homeTeamId, awayTeamId, homeTeamName, awayTeamName, player, competition, homeTeamLogo, awayTeamLogo));
            });
            return res.status(200).send(JSON.stringify(allGames));
        });
    }
    
    
}

module.exports = getSchedule;