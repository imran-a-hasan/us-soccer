const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const moment = require('moment');

const { TOURNAMENT_NAMES } = require('./constants/tournaments');
const { SM_TEAM_ID_TO_NAME } = require('./constants/teams');
const { PLAYER_NAME_TO_IMAGE_ID } = require('./constants/players');
const { IMAGE_ID_TO_ENCODING } = require('./constants/images');

const createResultObject = (time, teamId, homeTeamName, awayTeamName, homeTeamScore, awayTeamScore, competition, minutes, goals, assists, player, homeTeamLogo, awayTeamLogo, inSquad) => {
    return {
        time: time,
        player: player,
        playerImage: IMAGE_ID_TO_ENCODING[PLAYER_NAME_TO_IMAGE_ID[player]],
        team: SM_TEAM_ID_TO_NAME[teamId],
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeTeamImage: homeTeamLogo,
        awayTeamImage: awayTeamLogo,
        competition: competition,
        homeTeamScore: homeTeamScore,
        awayTeamScore: awayTeamScore,
        minutes: minutes,
        goals: goals,
        assists: assists,
        inSquad: inSquad
    };
};

exports.handler = (event, context, callback) => {
    var connection = mysql.createConnection({
        host: 'ussoccerdb.cdvnopviopp5.us-east-1.rds.amazonaws.com',
        port: '3306',
        user: 'admin',
        password: 'password',
        database: 'us_soccer'
    });
    connection.connect();
    const month = Number(event["queryStringParameters"]["month"]);
    if (month >= 1 && month <= 12) {
        const allGames = {};
        connection.query(`SELECT * FROM Results WHERE month=${month}
        ORDER BY date_time ASC`, function(err, results, fields) {
            results.forEach(row => {
                const dateTime = moment.utc(row.date_time);
                const date = dateTime.format().slice(0, 10);
                const time = dateTime.format('HH:mm:ssZ');
                const teamId = row.team_id;
                const homeTeamName = row.home_team_name;
                const awayTeamName = row.away_team_name;
                const homeTeamScore = row.home_team_goals;
                const awayTeamScore = row.away_team_goals;
                const competition = TOURNAMENT_NAMES[row.competition_id] || row.competition_name;
                const minutes = row.player_minutes;
                const goals = row.player_goals;
                const assists = row.player_assists;
                const player = row.player_name;
                const homeTeamLogo = row.home_team_logo;
                const awayTeamLogo = row.away_team_logo;
                const inSquad = row.in_squad;
                if (!allGames[date]) {
                    allGames[date] = [];
                }
                allGames[date].push(createResultObject(time, teamId, homeTeamName, awayTeamName, homeTeamScore, awayTeamScore, competition, minutes, goals, assists, player, homeTeamLogo, awayTeamLogo, inSquad));
            });
            connection.end();
            var response = {
                "statusCode": 200,
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(allGames)
            };
            callback(null, response);
        });
    }
};