const fetch = require('node-fetch');
const moment = require('moment');
const aws = require('aws-sdk');
const { SM_API_KEY, SM_TEAMS, SM_TEAM_ID_TO_PLAYERS } = require('../constants/teams');
const { PLAYER_NAME_TO_MATCH_ID } = require('../constants/players');

const START_DATE = '2020-08-01';

const httpGet = (team, cutoff) => {
    return new Promise (resolve => {
        fetch(`https://soccer.sportmonks.com/api/v2.0/fixtures/between/${START_DATE}/${cutoff}/${team}?api_token=${SM_API_KEY}&include=localTeam,visitorTeam,lineup,bench,stats,league`)
        .then(res => res.json())
        .then(json => {
            const results = json.data;
            resolve([team, results])
        });
    });
}

//exports.handler = async (event, context, callback) => {
    const TIMEOUT = false;
    const cutoff = moment.utc().format('YYYY-MM-DD');
    const promises = [];
    for (let i = 0; i < SM_TEAMS.length; i++) {
        const team = SM_TEAMS[i];
        if (TIMEOUT) {
            setTimeout(() => {
                promises.push(httpGet(team, cutoff));
            }, 2000 * i);
        } else {
            promises.push(httpGet(team, cutoff));
        }
        
    }
    const queries = [];
     Promise.all(promises).then(values => {
        values.forEach(value => {
            try {
                const teamId = value[0];
                const results = value[1];
                results.forEach(matchJson => {
                    if (matchJson.time.status === 'FT') {
                        console.log(matchJson);
                        const matchId = matchJson.id;
                        const dateTime = matchJson.time.starting_at.date_time;
                        const matchMonth = new Date(dateTime).getMonth() + 1;
                        const homeTeamId = matchJson.localteam_id;
                        const awayTeamId = matchJson.visitorteam_id;
                        const homeTeamName = matchJson.localTeam.data.name;
                        const awayTeamName = matchJson.visitorTeam.data.name;
                        const homeTeamGoals = matchJson.stats.data[0].goals;
                        const awayTeamGoals = matchJson.stats.data[1].goals;
                        const competitionId = matchJson.league.data.id;
                        const competitionName = matchJson.league.data.name;
                        const homeTeamLogo = matchJson.localTeam.data.logo_path;
                        const awayTeamLogo = matchJson.visitorTeam.data.logo_path; 
                        const startingLineupStats = matchJson.lineup.data;
                        const players = SM_TEAM_ID_TO_PLAYERS[teamId];
                        players.forEach(playerName => {
                            let playerMinutes = 0;
                            let playerGoals = 0;
                            let playerAssists = 0;
                            let inSquad = false;
                            if (startingLineupStats) {    
                                startingLineupStats.forEach(playerJson => {
                                    if(playerJson.player_id === PLAYER_NAME_TO_MATCH_ID[playerName]) {
                                        playerMinutes = playerJson.stats.other.minutes_played;
                                        playerGoals = playerJson.stats.goals.scored;
                                        playerAssists = playerJson.stats.goals.assists;
                                        inSquad = true;
                                    }
                                });
                            }
                            if (!inSquad) {
                                const benchStats = matchJson.bench.data;
                                if (benchStats) {
                                    benchStats.forEach(playerJson => {
                                        if(playerJson.player_id === PLAYER_NAME_TO_MATCH_ID[playerName]) {
                                            playerMinutes = playerJson.stats.other.minutes_played;
                                            playerGoals = playerJson.stats.goals.scored;
                                            playerAssists = playerJson.stats.goals.assists;
                                            inSquad = true;
                                        }
                                    });
                                }
                            }
                            queries.push(`INSERT INTO Results VALUES(\"${matchId}\", \"${dateTime}\", ${matchMonth}, \"${teamId}\", \"${homeTeamId}\", \"${awayTeamId}\",
                            \"${homeTeamName}\", \"${awayTeamName}\", ${homeTeamGoals}, ${awayTeamGoals}, \"${competitionId}\", \"${competitionName}\", \"${playerName}\",
                            ${playerMinutes}, ${playerGoals}, ${playerAssists}, \"${homeTeamLogo}\", \"${awayTeamLogo}\", ${inSquad})`);
                        });
                    }
                });
            } catch (error) {
                console.log(error);
            }
        });
      /*  var params = {
            FunctionName: 'PopulateResults',
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify(queries)
        };
        var lambda = new aws.Lambda();
        lambda.invoke(params, function(err, data) {
            if (err) {
              context.fail(err);
            } else {
              context.succeed();
            }
        });*/
    });
//};