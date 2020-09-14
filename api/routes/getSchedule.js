var express = require('express');
var fetch = require('node-fetch');
var fs = require('fs');
var path = require('path');
const teamConstants = require('../constants/teams');
const playerConstants = require('../constants/players');
const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const TEAMS = teamConstants.TEAMS;
const TEAM_ID_TO_NAME = teamConstants.TEAM_ID_TO_NAME;
const TEAM_ID_TO_PLAYERS = teamConstants.TEAM_ID_TO_PLAYERS;
const PLAYER_NAME_TO_ID = playerConstants.PLAYER_NAME_TO_ID;

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
    fetch('https://api.football-data.org/v2/teams/' + key+ '/matches?status=SCHEDULED', {
        headers: {'X-Auth-Token': '81ef26d68a9c4931a12738e1143b3a63'}
    })
    .then(res => res.json())
    .then(json => {
        const jsonResponse = JSON.stringify(json);
        redisPut(key, jsonResponse);
        resolve([key, jsonResponse])
    });
}

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
    const promises = [];
    TEAMS.forEach(team => { 
        promises.push(redisGet(team, req, res));
    });
    const unsortedGames = {};
    const allGames = {};
    Promise.all(promises).then((values) => {
        values.forEach(value => {
            const schedule = JSON.parse(value[1]).matches;
            schedule.forEach(matchJson => {
                if (!unsortedGames[matchJson.utcDate]) {
                    unsortedGames[matchJson.utcDate] = [];
                }
                unsortedGames[matchJson.utcDate].push([value[0], matchJson]);
            });
        });
        const sortedGames = {};
        Object.keys(unsortedGames).sort().forEach(timestamp => {
            sortedGames[timestamp] = unsortedGames[timestamp];
        });
        for (let [timestamp, matches] of Object.entries(sortedGames)) {
            matches.forEach(match => {
                const matchJson = match[1];
                const dateTime = new Date(timestamp);
                const date = dateTime.toISOString().slice(0, 10);
                const time = dateTime.toLocaleTimeString();
                const homeTeamId = matchJson.homeTeam.id;
                const awayTeamId = matchJson.awayTeam.id;
                const homeTeamName = TEAM_ID_TO_NAME[homeTeamId] || matchJson.homeTeam.name;
                const awayTeamName = TEAM_ID_TO_NAME[awayTeamId] || matchJson.awayTeam.name;
                const competition = matchJson.competition.name;
                const players = TEAM_ID_TO_PLAYERS[match[0]];
                players.forEach(player => {
                    if (!allGames[date]) {
                        allGames[date] = [];
                    }
                    allGames[date].push(createMatchObject(time, match[0], homeTeamId, awayTeamId, homeTeamName, awayTeamName, player, competition));
                });
            });
                
        }
        return res.status(200).send(JSON.stringify(allGames));
    });
}


module.exports = getSchedule;

// {date: {time, player, team, opponent, home/away, competition}}
