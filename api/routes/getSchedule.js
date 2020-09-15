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
const TEAM_ID_TO_REGION = teamConstants.TEAM_ID_TO_REGION;
const REGION_TO_API_KEY = teamConstants.REGION_TO_API_KEY;
const PLAYER_NAME_TO_ID = playerConstants.PLAYER_NAME_TO_ID;


const redisClient = redis.createClient(REDIS_PORT)

const redisPut = (key, value) => {
    redisClient.set(key, value);
}

const redisGet = (key, team, req, res, next) => {
    return new Promise(resolve => {
        redisClient.get(key, (error, data) => {     
            if (error) {
                reject(error);
            } else if (data !== null) {
                resolve([team, data]);
            } else {
                httpGet(key, team, req, res, resolve);
            }
        })
    });
}

const httpGet = (key, team, req, res, resolve) => {
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
    const promises = [];
    for (let i = 0; i < TEAMS.length; i++) {
        const team = TEAMS[i];
        promises.push(redisGet(`team-schedule-${team}`, team, req, res));
    }
    const unsortedGames = {};
    const allGames = {};
    Promise.all(promises).then((values) => {
        values.forEach(value => {
            const schedule = JSON.parse(value[1]).schedule;
            if (schedule) {
                for(let i = 0; i < schedule.length; i++) {
                    const matchJson = schedule[i];
                    const matchMonth = new Date(matchJson.scheduled).getMonth() + 1;
                    if  (matchMonth === month) {
                        if (!unsortedGames[matchJson.scheduled]) {
                            unsortedGames[matchJson.scheduled] = [];
                        }
                        unsortedGames[matchJson.scheduled].push([value[0], matchJson]);
                    } else if (matchMonth > month) {
                        break;
                    }
                };
            }
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
                const homeTeamId = matchJson.competitors[0].id.slice(14);
                const awayTeamId = matchJson.competitors[1].id.slice(14);
                const homeTeamName = TEAM_ID_TO_NAME[homeTeamId] || matchJson.competitors[0].name;
                const awayTeamName = TEAM_ID_TO_NAME[awayTeamId] || matchJson.competitors[1].name;
                const competition = matchJson.tournament.name;
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
