const redis = require('redis');
const mysql = require('mysql');
const fetch = require('node-fetch');
const REDIS_PORT = process.env.PORT || 6379;
const { TEAMS, TEAM_ID_TO_REGION, TEAM_ID_TO_PLAYERS, TEAM_ID_TO_NAME, REGION_TO_API_KEY } = require('../constants/teams');
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

const redisGet = (key, team) => {
    return new Promise(resolve => {
        redisClient.get(key, (error, data) => {     
            if (error) {
                reject(error);
            } else if (data !== null) {
                resolve([team, data]);
            } else {
                httpGet(key, team, resolve);
            }
        })
    });
}

const httpGet = (key, team, resolve) => {
    const regionCode = TEAM_ID_TO_REGION[team];
    const apiKey = REGION_TO_API_KEY[regionCode];
    
    fetch(`https://api.sportradar.us/soccer-t3/${regionCode}/en/teams/sr:competitor:${team}/schedule.json?api_key=${apiKey}`)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        const jsonResponse = JSON.stringify(json);
        redisPut(key, jsonResponse);
        resolve([team, jsonResponse])
    });
}

const TIMEOUT = false;

const promises = [];
for (let i = 0; i < TEAMS.length; i++) {
    const team = TEAMS[i];
    if (TIMEOUT) {
        setTimeout(() => {
            promises.push(redisGet(`team-schedule-${team}`, team));
        }, 1000 * i);
    } else {
        promises.push(redisGet(`team-schedule-${team}`, team));
    }
}

Promise.all(promises).then(values => {
    values.forEach(value => {
        const teamId = value[0];
        const schedule = JSON.parse(value[1]).schedule;
        if (schedule) {
            for(let i = 0; i < schedule.length; i++) {
                console.log(teamId);
                const matchJson = schedule[i];
                const matchId = matchJson.id;
                const dateTime = matchJson.scheduled;
                const matchMonth = new Date(dateTime).getMonth() + 1;
                const homeTeamId = matchJson.competitors[0].id;
                const homeTeamName = TEAM_ID_TO_NAME[homeTeamId.slice(14)] || matchJson.competitors[0].name;
                const awayTeamId = matchJson.competitors[1].id;
                const awayTeamName = TEAM_ID_TO_NAME[awayTeamId.slice(14)] || matchJson.competitors[1].name;
                const competitionId = matchJson.tournament.id;
                const competition = matchJson.tournament.name;
                const players = TEAM_ID_TO_PLAYERS[teamId];
                players.forEach(player => {
                    connection.query(`INSERT INTO Schedule VALUES(\"${matchId}\", \"${dateTime}\", ${matchMonth}, \"${teamId}\", \"${homeTeamId}\",
                        \"${awayTeamId}\", \"${homeTeamName}\", \"${awayTeamName}\", \"${competitionId}\", \"${competition}\", \"${player}\")`, function(error, rorws, fields) {});
                });
            }
        }
    });
    connection.end();
});




// match id, date time, month, team id, home team id, away team id, home team name, away team name, competition id, competition name, player id
