var fetch = require('node-fetch');
var fs = require('fs');
var path = require('path');
const redis = require('redis');
const teamConstants = require('../constants/teams');
const playerConstants = require('../constants/players');
const tournamentConstants = require('../constants/tournaments');
const REDIS_PORT = process.env.PORT || 6379;
const TEAMS = teamConstants.TEAMS;
const TEAM_ID_TO_NAME = teamConstants.TEAM_ID_TO_NAME;
const TEAM_ID_TO_PLAYERS = teamConstants.TEAM_ID_TO_PLAYERS;
const TEAM_ID_TO_REGION = teamConstants.TEAM_ID_TO_REGION;
const REGION_TO_API_KEY = teamConstants.REGION_TO_API_KEY;
const PLAYER_NAME_TO_ID = playerConstants.PLAYER_NAME_TO_ID;
const TOURNAMENT_NAMES = tournamentConstants.TOURNAMENT_NAMES;
const TOURNAMENT_TO_REGION_CODE = tournamentConstants.TOURNAMENT_TO_REGION_CODE;
const PLAYER_MATCH_IDS = playerConstants.PLAYER_MATCH_IDS;

const redisClient = redis.createClient(REDIS_PORT)

const createResultObject = (teamId, homeTeamId, awayTeamId, homeTeamName, awayTeamName, homeTeamScore, awayTeamScore, competition, minutes, goals, assists, player) => {
    return {
        player: player,
        imageId: PLAYER_NAME_TO_ID[player],
        playerImage: fs.readFileSync(path.resolve(`images/players/${PLAYER_NAME_TO_ID[player]}.png`), 'base64'),
        team: TEAM_ID_TO_NAME[teamId],
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeTeamImage: fs.readFileSync(path.resolve(`images/teams/${homeTeamId}.png`), 'base64'),
        awayTeamImage: fs.readFileSync(path.resolve(`images/teams/${awayTeamId}.png`), 'base64'),
        competition: TOURNAMENT_NAMES[competition] || competition,
        homeTeamScore: homeTeamScore,
        awayTeamScore: awayTeamScore,
        minutes: minutes,
        goals: goals,
        assists: assists
    }
}

const redisPut = (key, value) => {
    redisClient.set(key, value);
}

const redisGet = (key, team, req, res, url) => {
    return new Promise(resolve => {
        redisClient.get(key, (error, data) => {     
            if (error) {
                reject(error);
            } else if (data !== null) {
                resolve([team, data]);
            } else {
                httpGet(key, team, req, res, resolve, url);
            }
        })
    });
}

const httpGet = (key, team, req, res, resolve, url) => {
    fetch(url)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        const jsonResponse = JSON.stringify(json);
        redisPut(key, jsonResponse);
        resolve([team, jsonResponse])
    });
}
 
// for each team, iterate through their results and make a list of matches (or get it from redis key team-result-[id] if we already have it)
// for each match, get score info


function getResults(req, res) {
    const month = Number(req.query.month);
    const teamPromises = [];
    for (let i = 0; i < TEAMS.length; i++) {
        const team = TEAMS[i];
        const regionCode = TEAM_ID_TO_REGION[team];
        const apiKey = REGION_TO_API_KEY[regionCode];
        teamPromises.push(redisGet(`team-results-${team}`, team, req, res, `https://api.sportradar.us/soccer-t3/${regionCode}/en/teams/sr:competitor:${team}/results.json?api_key=${apiKey}`));
    }
    const allResults = [];
    Promise.all(teamPromises).then(values => {
        values.forEach(value => {
            const results = JSON.parse(value[1]).results;
            results.forEach(result => {
                const matchMonth = new Date(result.sport_event.scheduled).getMonth() + 1;
                if (month === matchMonth && result.sport_event_status.status === 'closed') {
                    allResults.push([value[0], result.sport_event.id, result.sport_event.tournament.id]);
                }
            })
        });
        const resultPromises = [];
        for (let i = 0; i < allResults.length; i++) {
            const team = allResults[i][0];
            const match = allResults[i][1];
            const regionCode = TOURNAMENT_TO_REGION_CODE[allResults[i][2]] || 'other';
            const apiKey = REGION_TO_API_KEY[regionCode];
            resultPromises.push(redisGet(`match-result-${match.slice(9)}`, team, req, res, `https://api.sportradar.us/soccer-t3/${regionCode}/en/matches/${match}/summary.json?api_key=${apiKey}`));            
        }
        const unsortedGames = {};
        
        Promise.all(resultPromises).then((values) => {
            values.forEach(value => {
                const teamId = value[0];
                const match = JSON.parse(value[1]);
                if (match.statistics) {
                    const teamStats = match.statistics.teams[0].id.slice(14) === teamId ? match.statistics.teams[0] : match.statistics.teams[1];
                    if (teamStats.players) {
                        teamStats.players.forEach(player => {
                            if (player.id in PLAYER_MATCH_IDS) {
                                if (!unsortedGames[match.sport_event.scheduled]) {
                                    unsortedGames[match.sport_event.scheduled] = [];
                                }
                                const homeTeamId = match.sport_event.competitors[0].id.slice(14);
                                const awayTeamId = match.sport_event.competitors[1].id.slice(14);
                                const homeTeamName = TEAM_ID_TO_NAME[homeTeamId] || match.sport_event.competitors[0].name;
                                const awayTeamName = TEAM_ID_TO_NAME[awayTeamId] || match.sport_event.competitors[1].name;
                                const homeTeamScore = match.sport_event_status.home_score;
                                const awayTeamScore = match.sport_event_status.away_score;
                                const competition = match.sport_event.tournament;
                                unsortedGames[match.sport_event.scheduled].push([value[0], player, homeTeamId, awayTeamId, homeTeamName, awayTeamName, homeTeamScore, awayTeamScore, competition]);
                            }
                        });
                    }
                    
                }
            });
            const sortedGames = {};
            Object.keys(unsortedGames).sort().forEach(timestamp => {
                sortedGames[timestamp] = unsortedGames[timestamp];
            });
            const results = {};
            for (let [timestamp, playerStats] of Object.entries(sortedGames)) {
                const dateTime = new Date(timestamp);
                const date = dateTime.toISOString().slice(0, 10);
                playerStats.forEach(match => {
                    const teamId = match[0];
                    const playerJson = match[1];
                    const homeTeamId = match[2];
                    const awayTeamId = match[3];
                    const homeTeamName = match[4];
                    const awayTeamName = match[5];
                    const homeTeamScore = match[6];
                    const awayTeamScore = match[7];
                    const competition = match[8].name;
                    const goals = playerJson.goals_scored;
                    const assists = playerJson.assists;
                    const minutes = 0;
                    const playerName = PLAYER_MATCH_IDS[playerJson.id];
                    if (!results[date]) {
                        results[date] = [];
                    }
                    results[date].push(createResultObject(teamId, homeTeamId, awayTeamId, homeTeamName, awayTeamName,
                        homeTeamScore, awayTeamScore, competition, minutes, goals, assists,
                        playerName));
                    
                });
            } 
            return res.status(200).send(JSON.stringify(results));    
        });
        
    });
    
    
}

module.exports = getResults;