const CHELSEA_ID = '38';
const MANCHESTER_CITY_ID = '17';
const NEWCASTLE_UNITED_ID = '39';
const FULHAM_ID = '43';
const JUVENTUS_ID = '2687';
const BORUSSIA_DORTMUND_ID = '2673';
const WOLFSBURG_ID = '2524';
const RB_LEIPZIG_ID = '36360';
const FRANKFURT_ID = '2674';
const WERDER_BREMEN_ID = '2534';
const BOAVISTA_ID = '2995';
const AJAX_ID = '2953';
const LILLE_ID = '1643';
const BESIKTAS_ID = '3050';
const CAEN_ID = '1667';
const SUNDERLAND_ID = '41';
const DERBY_COUNTY_ID = '27';
const INTERNACIONAL_ID = '1996';
const SC_HEERENVEEN_ID = '2964';
const GREUTHER_FURTH_ID = '2551';
const HERACLES_ID = '2977';

const REGION_EU = 'eu';
const REGION_AM = 'am';
const REGION_OTHER = 'other';

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
    MANCHESTER_CITY_ID,
    BESIKTAS_ID,
    CAEN_ID,
    SUNDERLAND_ID,
    DERBY_COUNTY_ID,
    INTERNACIONAL_ID,
    SC_HEERENVEEN_ID,
    GREUTHER_FURTH_ID,
    HERACLES_ID
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
    [MANCHESTER_CITY_ID]: 'Manchester City',
    [BESIKTAS_ID]: 'Besiktas',
    [CAEN_ID]: 'SM Caen',
    [SUNDERLAND_ID]: 'Sunderland',
    [DERBY_COUNTY_ID]: 'Derby County',
    [INTERNACIONAL_ID]: 'Internacional',
    [SC_HEERENVEEN_ID]: 'SC Heerenveen',
    [GREUTHER_FURTH_ID]: 'Greuther Fürth',
    [HERACLES_ID]: 'Heracles'
}

const TEAM_ID_TO_REGION = {
    [CHELSEA_ID]: REGION_EU,
    [JUVENTUS_ID]: REGION_EU,
    [BORUSSIA_DORTMUND_ID]: REGION_EU,
    [WOLFSBURG_ID]: REGION_EU,
    [RB_LEIPZIG_ID]: REGION_EU,
    [NEWCASTLE_UNITED_ID]: REGION_EU,
    [FRANKFURT_ID]: REGION_EU,
    [FULHAM_ID]: REGION_EU,
    [BOAVISTA_ID]: REGION_EU,
    [AJAX_ID]: REGION_EU,
    [LILLE_ID]: REGION_EU,
    [WERDER_BREMEN_ID]: REGION_EU,
    [MANCHESTER_CITY_ID]: REGION_EU,
    [BESIKTAS_ID]: REGION_EU,
    [CAEN_ID]: REGION_OTHER,
    [SUNDERLAND_ID]: REGION_OTHER,
    [DERBY_COUNTY_ID]: REGION_OTHER,
    [INTERNACIONAL_ID]: REGION_AM,
    [SC_HEERENVEEN_ID]: REGION_EU,
    [GREUTHER_FURTH_ID]: REGION_OTHER,
    [HERACLES_ID]: REGION_EU
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
    [MANCHESTER_CITY_ID]: ['Zack Steffen'],
    [BESIKTAS_ID]: ['Tyler Boyd'],
    [CAEN_ID]: ['Nicholas Gioacchini'],
    [SUNDERLAND_ID]: ['Lynden Gooch'],
    [DERBY_COUNTY_ID]: ['Duane Holmes'],
    [INTERNACIONAL_ID]: ['Johnny Cardoso'],
    [SC_HEERENVEEN_ID]: ['Ulysses Llanez'],
    [GREUTHER_FURTH_ID]: ['Julian Green'],
    [HERACLES_ID]: ['Luca de la Torre']
}

const REGION_TO_API_KEY = {
    [REGION_EU]: 'tmf92zuvmrr873zjfugugwfd',
    [REGION_AM]: '8rycq5wra9sp4sdrbuchkh4g',
    [REGION_OTHER]: 'a7agjcd3cy6nzzycpcydyhv3'
}

module.exports = {TEAMS, TEAM_ID_TO_NAME, TEAM_ID_TO_REGION, TEAM_ID_TO_PLAYERS, REGION_TO_API_KEY};