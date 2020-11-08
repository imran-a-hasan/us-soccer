const fetch = require('node-fetch');
const { SM_API_KEY, SM_TEAMS, SM_TEAM_ID_TO_PLAYERS } = require('../constants/teams');

const httpGet = (team) => {
    return new Promise (resolve => {
        fetch(`https://soccer.sportmonks.com/api/v2.0/teams/${team}?api_token=${SM_API_KEY}&include=localFixtures.localTeam,localFixtures.visitorTeam,visitorFixtures.localTeam,visitorFixtures.visitorTeam,localFixtures.league,visitorFixtures.league`)
        .then(res => res.json())
        .then(json => {
            const homeFixtures = json.data.localFixtures.data;
            const awayFixtures = json.data.visitorFixtures.data;
            resolve([team, homeFixtures, awayFixtures])
        });
    });
}

exports.handler = (event, context, callback) => {
    const TIMEOUT = false;
    const promises = [];
    for (let i = 0; i < SM_TEAMS.length; i++) {
        const team = SM_TEAMS[i];
        if (TIMEOUT) {
            setTimeout(() => {
                promises.push(httpGet(team));
            }, 2000 * i);
        } else {
            promises.push(httpGet(team));
        }
    }
    const queries = [];
    Promise.all(promises).then(values => {
        values.forEach(value => {
            const teamId = value[0];
            const homeSchedule = value[1];
            const awaySchedule = value[2];
            if (homeSchedule) {
                for(let i = 0; i < homeSchedule.length; i++) {
                    const matchJson = homeSchedule[i];
                    if (matchJson.time.status === "NS") {
                        const matchId = matchJson.id;
                        const dateTime = matchJson.time.starting_at.date_time;
                        const matchMonth = new Date(dateTime).getMonth() + 1;
                        const homeTeamId = matchJson.localteam_id;
                        const homeTeamName = matchJson.localTeam.data.name;
                        const awayTeamId = matchJson.visitorteam_id;
                        const awayTeamName = matchJson.visitorTeam.data.name;
                        const competitionId = matchJson.league.data.id;
                        const competition = matchJson.league.data.name;
                        const players = SM_TEAM_ID_TO_PLAYERS[teamId];
                        const homeTeamLogo = matchJson.localTeam.data.logo_path;
                        const awayTeamLogo = matchJson.visitorTeam.data.logo_path;
                        players.forEach(player => {
                            queries.push(`INSERT INTO Schedule VALUES(\"${matchId}\", \"${dateTime}\", ${matchMonth}, \"${teamId}\", \"${homeTeamId}\",
                                \"${awayTeamId}\", \"${homeTeamName}\", \"${awayTeamName}\", \"${competitionId}\", \"${competition}\", \"${player}\", \"${homeTeamLogo}\", \"${awayTeamLogo}\")`);
                        });
                    }
                }
            }
            if (awaySchedule) {
                for(let i = 0; i < awaySchedule.length; i++) {
                    const matchJson = awaySchedule[i];
                    if (matchJson.time.status === "NS") {
                        const matchId = matchJson.id;
                        const dateTime = matchJson.time.starting_at.date_time;
                        const matchMonth = new Date(dateTime).getMonth() + 1;
                        const homeTeamId = matchJson.localteam_id;
                        const homeTeamName = matchJson.localTeam.data.name; 
                        const awayTeamId = matchJson.visitorteam_id;
                        const awayTeamName = matchJson.visitorTeam.data.name;
                        const competitionId = matchJson.league.data.id;
                        const competition = matchJson.league.data.name;
                        const players = SM_TEAM_ID_TO_PLAYERS[teamId];
                        const homeTeamLogo = matchJson.localTeam.data.logo_path;
                        const awayTeamLogo = matchJson.visitorTeam.data.logo_path;
                        players.forEach(player => {
                            queries.push(`INSERT INTO Schedule VALUES(\"${matchId}\", \"${dateTime}\", ${matchMonth}, \"${teamId}\", \"${homeTeamId}\",
                                \"${awayTeamId}\", \"${homeTeamName}\", \"${awayTeamName}\", \"${competitionId}\", \"${competition}\", \"${player}\", \"${homeTeamLogo}\", \"${awayTeamLogo}\")`);
                        });
                    }
                }
            }
        });
    });
};