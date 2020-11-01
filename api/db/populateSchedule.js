const redis = require('redis');
const mysql = require('mysql');
const fetch = require('node-fetch');
const REDIS_PORT = process.env.PORT || 6379;
const { TEAMS, TEAM_ID_TO_REGION, TEAM_ID_TO_PLAYERS, TEAM_ID_TO_NAME, REGION_TO_API_KEY, SM_API_KEY, SM_TEAMS, SM_TEAM_ID_TO_PLAYERS, SM_TEAM_ID_TO_NAME } = require('../constants/teams');
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
        redisClient.get(`${key}-home`, (homeError, homeData) => {     
            if (homeError) {
                reject(homeError);
            } else if (homeData !== null) {
                redisClient.get(`${key}-away`, (awayError, awayData) => {
                    if (awayError) {
                        reject(awayError);
                    }
                    resolve([team, homeData, awayData]);
                });     
            } else {
                httpGet(key, team, resolve);
            }
        });
    });
}

const httpGet = (key, team, resolve) => {
  //  const regionCode = TEAM_ID_TO_REGION[team];
   // const apiKey = REGION_TO_API_KEY[regionCode];
    
    fetch(`https://soccer.sportmonks.com/api/v2.0/teams/${team}?api_token=${SM_API_KEY}&include=localFixtures.localTeam,localFixtures.visitorTeam,visitorFixtures.localTeam,visitorFixtures.visitorTeam,visitorFixtures.league,localFixtures.league`)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        const homeFixtures = json.data.localFixtures.data;
        const awayFixtures = json.data.visitorFixtures.data;
        redisPut(`${key}-home`, JSON.stringify(homeFixtures));
        redisPut(`${key}-away`, JSON.stringify(awayFixtures));
        resolve([team, homeFixtures, awayFixtures])
    });
}

const TIMEOUT = false;

const promises = [];
for (let i = 0; i < SM_TEAMS.length; i++) {
    const team = SM_TEAMS[i];
    if (TIMEOUT) {
        setTimeout(() => {
            promises.push(redisGet(`team-schedule-${team}`, team));
        }, 2000 * i);
    } else {
        promises.push(redisGet(`team-schedule-${team}`, team));
    }
}

Promise.all(promises).then(values => {
    values.forEach(value => {
        const teamId = value[0];
        const homeSchedule = JSON.parse(value[1]);
        const awaySchedule = JSON.parse(value[2]);
        if (homeSchedule) {
            for(let i = 0; i < homeSchedule.length; i++) {
                const matchJson = homeSchedule[i];
                const matchId = matchJson.id;
                const dateTime = matchJson.time.starting_at.date_time;
                const matchMonth = new Date(dateTime).getMonth() + 1;
                const homeTeamId = matchJson.localteam_id;
                const homeTeamName = SM_TEAM_ID_TO_NAME[homeTeamId];
                const awayTeamId = matchJson.visitorteam_id;
                const awayTeamName = matchJson.visitorTeam.data.name;
                const competitionId = matchJson.league.data.id;
                const competition = matchJson.league.data.name;
                const players = SM_TEAM_ID_TO_PLAYERS[teamId];
                const homeTeamLogo = matchJson.localTeam.data.logo_path;
                const awayTeamLogo = matchJson.visitorTeam.data.logo_path;
                players.forEach(player => {
                    connection.query(`INSERT INTO Schedule2 VALUES(\"${matchId}\", \"${dateTime}\", ${matchMonth}, \"${teamId}\", \"${homeTeamId}\",
                        \"${awayTeamId}\", \"${homeTeamName}\", \"${awayTeamName}\", \"${competitionId}\", \"${competition}\", \"${player}\", \"${homeTeamLogo}\", \"${awayTeamLogo}\")`, function(error, rows, fields) {});
                });
            }
        }
        if (awaySchedule) {
            for(let i = 0; i < awaySchedule.length; i++) {
                const matchJson = awaySchedule[i];
                const matchId = matchJson.id;
                const dateTime = matchJson.time.starting_at.date_time;
                const matchMonth = new Date(dateTime).getMonth() + 1;
                const homeTeamId = matchJson.localteam_id;
                const homeTeamName = matchJson.localTeam.data.name; 
                const awayTeamId = matchJson.visitorteam_id;
                const awayTeamName = SM_TEAM_ID_TO_NAME[awayTeamId];
                const competitionId = matchJson.league.data.id;
                const competition = matchJson.league.data.name;
                const players = SM_TEAM_ID_TO_PLAYERS[teamId];
                const homeTeamLogo = matchJson.localTeam.data.logo_path;
                const awayTeamLogo = matchJson.visitorTeam.data.logo_path;
                players.forEach(player => {
                    connection.query(`INSERT INTO Schedule2 VALUES(\"${matchId}\", \"${dateTime}\", ${matchMonth}, \"${teamId}\", \"${homeTeamId}\",
                        \"${awayTeamId}\", \"${homeTeamName}\", \"${awayTeamName}\", \"${competitionId}\", \"${competition}\", \"${player}\", \"${homeTeamLogo}\", \"${awayTeamLogo}\")`, function(error, rows, fields) {});
                });
            }
        }
    });
    connection.end();
});




// match id, date time, month, team id, home team id, away team id, home team name, away team name, competition id, competition name, player id
