const fetch = require('node-fetch');
const mysql = require('mysql');
const redis = require('redis');
const moment = require('moment');
const { REGION_TO_API_KEY, TEAM_ID_TO_NAME, SM_TEAM_ID_TO_NAME, SM_API_KEY } = require('../constants/teams');
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
                httpGet(key, team, playerName, url, resolve);
            }
        })
    });
}

const httpGet = (key, team, playerName, url, resolve) => {
    fetch(url)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        const jsonResponse = JSON.stringify(json.data);
        redisPut(key, jsonResponse);
        resolve([team, jsonResponse, playerName])
    });
}

const TIMEOUT = false;

const dateTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
matches = [];
connection.query(`SELECT * FROM Schedule2 WHERE date_time <= \"${dateTime}\"
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
        const url = `https://soccer.sportmonks.com/api/v2.0/fixtures/${matchId}?api_token=${SM_API_KEY}&include=localTeam,visitorTeam,lineup,league,stats`;
        if (TIMEOUT) {
            setTimeout(() => {
                promises.push(redisGet(`match-result-${matchId}`, teamId, playerName, url));
            }, 1000 * i);
        } else {
            promises.push(redisGet(`match-result-${matchId}`, teamId, playerName, url));
        }
        
    }
    Promise.all(promises).then(values => {
        values.forEach(value => {
            const teamId = value[0];
            const matchJson = JSON.parse(value[1]);
            const playerName = value[2];
            const matchId = matchJson.id;
            const dateTime = matchJson.time.starting_at.date_time;
            const matchMonth = new Date(dateTime).getMonth() + 1;
            const homeTeamId = matchJson.localteam_id;
            const awayTeamId = matchJson.visitorteam_id;
            const homeTeamName = SM_TEAM_ID_TO_NAME[homeTeamId] || matchJson.localTeam.data.name;
            const awayTeamName = SM_TEAM_ID_TO_NAME[awayTeamId] || matchJson.visitorTeam.data.name;
            const homeTeamGoals = matchJson.stats.data[0].goals;
            const awayTeamGoals = matchJson.stats.data[1].goals;
            const competitionId = matchJson.league.data.id;
            const competitionName = matchJson.league.data.name;
            const homeTeamLogo = matchJson.localTeam.data.logo_path;
            const awayTeamLogo = matchJson.visitorTeam.data.logo_path;
            let playerMinutes = 0;
            let playerGoals = 0;
            let playerAssists = 0;
            const teamStats = homeTeamId === teamId ? matchJson.lineup.data : matchJson.lineup.data;
            if (teamStats) {    
                teamStats.forEach(playerJson => {
                    if(playerJson.player_id === PLAYER_NAME_TO_MATCH_ID[playerName]) {
                        playerMinutes = playerJson.stats.other.minutes_played ?? 0;
                        playerGoals = playerJson.stats.goals.scored ?? 0;
                        playerAssists = playerJson.stats.goals.assists ?? 0;
                    }
                });
            }
            connection.query(`INSERT INTO Results2 VALUES(\"${matchId}\", \"${dateTime}\", ${matchMonth}, \"${teamId}\", \"${homeTeamId}\", \"${awayTeamId}\",
            \"${homeTeamName}\", \"${awayTeamName}\", ${homeTeamGoals}, ${awayTeamGoals}, \"${competitionId}\", \"${competitionName}\", \"${playerName}\",
            ${playerMinutes}, ${playerGoals}, ${playerAssists}, \"${homeTeamLogo}\", \"${awayTeamLogo}\")`, function(err, rows, fields) { });
        });
    });
});


// match id, date time, month, team id, home team id, away team id, home team name, away team name, home team goals, away team goals, competition id, competition name, player name, player minutes, player goals, player assists 