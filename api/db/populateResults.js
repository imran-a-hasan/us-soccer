const fetch = require('node-fetch');
const mysql = require('mysql');
const redis = require('redis');
const moment = require('moment');
const { REGION_TO_API_KEY, TEAM_ID_TO_NAME } = require('../constants/teams');
const { TOURNAMENT_TO_REGION_CODE } = require('../constants/tournaments');
const { PLAYER_NAME_TO_MATCH_ID } = require('../constants/players');
const REDIS_PORT = process.env.PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT)

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'us_soccer'
});

connection.connect();

const redisPut = (key, value) => {
    redisClient.set(key, value);
}

const redisGet = (key, team, playerName, url) => {
    return new Promise(resolve => {
        redisClient.get(key, (error, data) => {     
            if (error) {
                reject(error);
            } else if (data !== null) {
                resolve([team, data, playerName]);
            } else {
                httpGet(key, team, playerName, resolve, url);
            }
        })
    });
}

const httpGet = (key, team, playerName, resolve, url) => {
    fetch(url)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        const jsonResponse = JSON.stringify(json);
        redisPut(key, jsonResponse);
        resolve([team, jsonResponse, playerName])
    });
}

const TIMEOUT = false;

const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
matches = [];
connection.query(`SELECT * FROM Schedule WHERE date_time <= \"${dateTime}\"
    ORDER BY date_time ASC`, function(err, results, fields) {
    results.forEach(row => {
        matches.push([row.match_id, row.team_id, row.competition_id, row.player_name]);
    });
    const promises = [];
    for (let i = 0; i < matches.length; i++) {
        const matchId = matches[i][0];
        const teamId = matches[i][1];
        const competitionId = matches[i][2];
        const playerName = matches[i][3];
        const regionCode = TOURNAMENT_TO_REGION_CODE[competitionId] || 'other';
        const apiKey = REGION_TO_API_KEY[regionCode];
        if (TIMEOUT) {
            setTimeout(() => {
                promises.push(redisGet(`match-result-${matchId.slice(9)}`, teamId, playerName, `https://api.sportradar.us/soccer-t3/${regionCode}/en/matches/${matchId}/summary.json?api_key=${apiKey}`));
            }, 1000 * i);
        } else {
            promises.push(redisGet(`match-result-${matchId.slice(9)}`, teamId, playerName, `https://api.sportradar.us/soccer-t3/${regionCode}/en/matches/${matchId}/summary.json?api_key=${apiKey}`));
        }
        
    }
    Promise.all(promises).then(values => {
        values.forEach(value => {
            const teamId = value[0];
            const matchJson = JSON.parse(value[1]);
            const playerName = value[2];
            const matchId = matchJson.sport_event.id;
            const dateTime = matchJson.sport_event.scheduled;
            const matchMonth = new Date(dateTime).getMonth() + 1;
            const homeTeamId = matchJson.sport_event.competitors[0].id;
            const awayTeamId = matchJson.sport_event.competitors[1].id;
            const homeTeamName = TEAM_ID_TO_NAME[homeTeamId.slice(14)] || matchJson.sport_event.competitors[0].name;
            const awayTeamName = TEAM_ID_TO_NAME[awayTeamId.slice(14)] || matchJson.sport_event.competitors[1].name;
            const homeTeamGoals = matchJson.sport_event_status.home_score;
            const awayTeamGoals = matchJson.sport_event_status.away_score;
            const competitionId = matchJson.sport_event.tournament.id;
            const competitionName = matchJson.sport_event.tournament.name;
            const playerMinutes = 0;
            let playerGoals = 0;
            let playerAssists = 0;
            const teamStats = matchJson.statistics.teams[0].id.slice(14) === teamId ? matchJson.statistics.teams[0] : matchJson.statistics.teams[1];
            if (teamStats && teamStats.players) {           
                teamStats.players.forEach(playerJson => {
                    if(playerJson.id === PLAYER_NAME_TO_MATCH_ID[playerName]) {
                        playerGoals = playerJson.goals_scored || 0;
                        playerAssists = playerJson.assists || 0;
                    }
                });
            }
            connection.query(`INSERT INTO Results VALUES(\"${matchId}\", \"${dateTime}\", ${matchMonth}, \"${teamId}\", \"${homeTeamId}\", \"${awayTeamId}\",
            \"${homeTeamName}\", \"${awayTeamName}\", ${homeTeamGoals}, ${awayTeamGoals}, \"${competitionId}\", \"${competitionName}\", \"${playerName}\",
            ${playerMinutes}, ${playerGoals}, ${playerAssists})`, function(err, rows, fields) {});
        });
    });
});


// match id, date time, month, team id, home team id, away team id, home team name, away team name, home team goals, away team goals, competition id, competition name, player name, player minutes, player goals, player assists 