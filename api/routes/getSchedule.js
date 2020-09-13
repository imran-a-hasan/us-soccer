var express = require('express');
var fetch = require('node-fetch');
const teamConstants = require('../constants/teams');
const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const TEAMS = teamConstants.TEAMS;
const TEAM_ID_TO_NAME = teamConstants.TEAM_ID_TO_NAME;
const TEAM_ID_TO_PLAYER = teamConstants.TEAM_ID_TO_PLAYERS;

const redisClient = redis.createClient(REDIS_PORT)

const redisPut = (key, value) => {
    redisClient.set(key, value);
}

const redisGet = (key, req, res, next) => {
    return new Promise(resolve => {
        redisClient.get(key, (error, data) => {
            if (error) {
                reject(error);
            } else if (data !== null) {
                resolve([key, data]);
            } else {
                httpGet(key, req, res, resolve);
            }
        })
    });
}

const httpGet = (key, req, res, resolve) => {
    fetch('https://api.football-data.org/v2/teams/' + key + '/matches?status=SCHEDULED', {
        headers: {'X-Auth-Token': '81ef26d68a9c4931a12738e1143b3a63'}
    })
    .then(res => res.json())
    .then(json => {
        const jsonResponse = JSON.stringify(json);
        redisPut(key, jsonResponse);
        resolve([key, jsonResponse])
    });
}

const createMatchObject = (time, team, player, homeTeam, awayTeam, competition) => {
    let home = true;
    if (team !== homeTeam) {
        home = false;
    }
    return {
        time: time,
        player: player,
        team: team,
        opponent: home ? awayTeam : homeTeam,
        home: home,
        competition: competition
    }
}

function getSchedule(req, res) {
    const promises = [];
    TEAMS.forEach(team => { 
        promises.push(redisGet(team, req, res));
    });
    const allGames = {};
    Promise.all(promises).then((values) => {
        values.forEach(value => {
            const teamName = TEAM_ID_TO_NAME[value[0]];
            const schedule = JSON.parse(value[1]).matches;
            schedule.forEach(matchJson => {
                const dateTime = new Date(matchJson.utcDate);
                const date = dateTime.toISOString().slice(0, 10);
                const time = dateTime.toLocaleTimeString();
                const homeTeam = TEAM_ID_TO_NAME[matchJson.homeTeam.id] || matchJson.homeTeam.name;
                const awayTeam = TEAM_ID_TO_NAME[matchJson.awayTeam.id] || matchJson.awayTeam.name;
                const competition = matchJson.competition.name;
                const players = TEAM_ID_TO_PLAYER[value[0]];
                players.forEach(player => {
                    const match = createMatchObject(time, teamName, player, homeTeam, awayTeam, competition);
                    if (!allGames[date]) {
                        allGames[date] = [];
                    }
                    allGames[date].push(match);
                })
                
            });
        })
        return res.status(200).send(JSON.stringify(allGames));
    });
}


module.exports = getSchedule;

// {date: {time, player, team, opponent, home/away, competition}}
