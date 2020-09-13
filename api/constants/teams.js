const CHELSEA_ID = '61';
const JUVENTUS_ID = '109';
const BORUSSIA_DORTMUND_ID = '4';
const WOLFSBURG_ID = '11';
const RB_LEIPZIG_ID = '721';
const NEWCASTLE_UNITED_ID = '67';
const FRANKFURT_ID = '19';
const FULHAM_ID = '63';
const BOAVISTA_ID = '810';
const AJAX_ID = '678';
const LILLE_ID = '521';
const WERDER_BREMEN_ID = '12';
const MANCHESTER_CITY_ID = '65';

const TEAMS = [
    CHELSEA_ID,
    JUVENTUS_ID,
    BORUSSIA_DORTMUND_ID,
    WOLFSBURG_ID,
    RB_LEIPZIG_ID,
    NEWCASTLE_UNITED_ID,
    FRANKFURT_ID,
    FULHAM_ID,
    BOAVISTA_ID,
    AJAX_ID,
    LILLE_ID,
    WERDER_BREMEN_ID,
    MANCHESTER_CITY_ID
]

const TEAM_ID_TO_NAME = {
    [CHELSEA_ID]: 'Chelsea',
    [JUVENTUS_ID]: 'Juventus',
    [BORUSSIA_DORTMUND_ID]: 'Borussia Dortmund',
    [WOLFSBURG_ID]: 'Wolfsburg',
    [RB_LEIPZIG_ID]: 'RB Leipzig',
    [NEWCASTLE_UNITED_ID]: 'Newcastle United',
    [FRANKFURT_ID]: 'Frankfurt',
    [FULHAM_ID]: 'Fulham',
    [BOAVISTA_ID]: 'Boavista',
    [AJAX_ID]: 'Ajax',
    [LILLE_ID]: 'Lille',
    [WERDER_BREMEN_ID]: 'Werder Bremen',
    [MANCHESTER_CITY_ID]: 'Manchester City'
}


const TEAM_ID_TO_PLAYERS = {
    [CHELSEA_ID]: ['Christian Pulisic'],
    [JUVENTUS_ID]: ['Weston McKennie'],
    [BORUSSIA_DORTMUND_ID]: ['Giovanni Reyna'],
    [WOLFSBURG_ID]: ['John Brooks'],
    [RB_LEIPZIG_ID]: ['Tyler Adams'],
    [NEWCASTLE_UNITED_ID]: ['DeAndre Yedlin'],
    [FRANKFURT_ID]: ['Timothy Chandler'],
    [FULHAM_ID]: ['Tim Ream', 'Antonee Robinson'],
    [BOAVISTA_ID]: ['Reggie Cannon'],
    [AJAX_ID]: ['Sergino Dest'],
    [LILLE_ID]: ['Timothy Weah'],
    [WERDER_BREMEN_ID]: ['Josh Sargent'],
    [MANCHESTER_CITY_ID]: ['Zack Steffen']
}

module.exports = {TEAMS, TEAM_ID_TO_NAME, TEAM_ID_TO_PLAYERS};