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
const BARCELONA_ID = '2817';
const LILLE_ID = '1643';
const BESIKTAS_ID = '3050';
const CAEN_ID = '1667';
const SUNDERLAND_ID = '41';
const DERBY_COUNTY_ID = '27';
const INTERNACIONAL_ID = '1996';
const SC_HEERENVEEN_ID = '2964';
const GREUTHER_FURTH_ID = '2551';
const HERACLES_ID = '2977';
const AUSTRIA_WIEN_ID = '2203';
const ST_TRUIDEN_ID = '2895';
const SC_TELSTAR_ID = '2972';
const BURTON_ALBION_ID = '134';

const SM_CHELSEA_ID = '18';
const SM_MANCHESTER_CITY_ID = '9';
const SM_NEWCASTLE_UNITED_ID = '20'
const SM_FULHAM_ID = '11';
const SM_JUVENTUS_ID = '625';
const SM_BORUSSIA_DORTMUND_ID = '68';
const SM_WOLFSBURG_ID = '510';
const SM_RB_LEIPZIG_ID = '277';
const SM_FRANKFURT_ID = '366';
const SM_WERDER_BREMEN_ID = '82';
const SM_BOAVISTA_ID = '960';
const SM_BARCELONA_ID = '83';
const SM_LILLE_ID = '690';
const SM_BESIKTAS_ID = '554';
const SM_CAEN_ID = '';
const SM_SUNDERLAND_ID = '3';
const SM_DERBY_COUNTY_ID = '24';
const SM_INTERNACIONAL_ID = '2696';
const SM_SC_HEERENVEEN_ID = '1053';
const SM_GREUTHER_FURTH_ID = '3431';
const SM_HERACLES_ID = '1403';
const SM_AUSTRIA_WIEN_ID = '3630';
const SM_ST_TRUIDEN_ID = '355';
const SM_SC_TELSTAR_ID = '1550';
const SM_BURTON_ALBION_ID = '150';
const SM_ANDERLECHT_ID = '2555';

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
    BARCELONA_ID,
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
    HERACLES_ID,
    AUSTRIA_WIEN_ID,
    ST_TRUIDEN_ID,
    SC_TELSTAR_ID,
    BURTON_ALBION_ID
];

const SM_TEAMS = [
    SM_CHELSEA_ID,
    SM_JUVENTUS_ID,
    SM_BORUSSIA_DORTMUND_ID,
    SM_WOLFSBURG_ID,
    SM_RB_LEIPZIG_ID,
    SM_NEWCASTLE_UNITED_ID,
    SM_FRANKFURT_ID,
    SM_FULHAM_ID,
    SM_BOAVISTA_ID,
    SM_BARCELONA_ID,
    SM_LILLE_ID,
    SM_WERDER_BREMEN_ID,
    SM_MANCHESTER_CITY_ID,
    SM_BESIKTAS_ID,
//    SM_CAEN_ID,
    SM_SUNDERLAND_ID,
    SM_DERBY_COUNTY_ID,
    SM_INTERNACIONAL_ID,
    SM_SC_HEERENVEEN_ID,
    SM_GREUTHER_FURTH_ID,
    SM_HERACLES_ID,
    SM_AUSTRIA_WIEN_ID,
    SM_ST_TRUIDEN_ID,
    SM_SC_TELSTAR_ID,
    SM_BURTON_ALBION_ID,
    SM_ANDERLECHT_ID
];

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
    [BARCELONA_ID]: 'FC Barcelona',
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
    [HERACLES_ID]: 'Heracles',
    [AUSTRIA_WIEN_ID]: 'Austria Wien',
    [ST_TRUIDEN_ID]: 'St. Truiden',
    [SC_TELSTAR_ID]: 'SC Telstar',
    [BURTON_ALBION_ID]: 'Burton Albion'
};

const SM_TEAM_ID_TO_NAME = {
    [SM_CHELSEA_ID]: 'Chelsea',
    [SM_JUVENTUS_ID]: 'Juventus',
    [SM_BORUSSIA_DORTMUND_ID]: 'Borussia Dortmund',
    [SM_WOLFSBURG_ID]: 'Wolfsburg',
    [SM_RB_LEIPZIG_ID]: 'RB Leipzig',
    [SM_NEWCASTLE_UNITED_ID]: 'Newcastle United',
    [SM_FRANKFURT_ID]: 'Frankfurt',
    [SM_FULHAM_ID]: 'Fulham',
    [SM_BOAVISTA_ID]: 'Boavista',
    [SM_BARCELONA_ID]: 'FC Barcelona',
    [SM_LILLE_ID]: 'Lille',
    [SM_WERDER_BREMEN_ID]: 'Werder Bremen',
    [SM_MANCHESTER_CITY_ID]: 'Manchester City',
    [SM_BESIKTAS_ID]: 'Besiktas',
    [SM_CAEN_ID]: 'SM Caen',
    [SM_SUNDERLAND_ID]: 'Sunderland',
    [SM_DERBY_COUNTY_ID]: 'Derby County',
    [SM_INTERNACIONAL_ID]: 'Internacional',
    [SM_SC_HEERENVEEN_ID]: 'SC Heerenveen',
    [SM_GREUTHER_FURTH_ID]: 'Greuther Fürth',
    [SM_HERACLES_ID]: 'Heracles',
    [SM_AUSTRIA_WIEN_ID]: 'Austria Wien',
    [SM_ST_TRUIDEN_ID]: 'St. Truiden',
    [SM_SC_TELSTAR_ID]: 'SC Telstar',
    [SM_BURTON_ALBION_ID]: 'Burton Albion',
    [SM_ANDERLECHT_ID]: 'Anderlecht'
};

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
    [BARCELONA_ID]: REGION_EU,
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
    [HERACLES_ID]: REGION_EU,
    [AUSTRIA_WIEN_ID]: REGION_OTHER,
    [ST_TRUIDEN_ID]: REGION_EU,
    [SC_TELSTAR_ID]: REGION_OTHER,
    [BURTON_ALBION_ID]: REGION_OTHER
};

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
    [BARCELONA_ID]: ['Sergino Dest'],
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
    [HERACLES_ID]: ['Luca de la Torre'],
    [AUSTRIA_WIEN_ID]: ['Erik Palmer-Brown'],
    [ST_TRUIDEN_ID]: ['Chris Durkin'],
    [SC_TELSTAR_ID]: ['Sebastian Soto'],
    [BURTON_ALBION_ID]: ['Indiana Vassilev']
};

const SM_TEAM_ID_TO_PLAYERS = {
    [SM_CHELSEA_ID]: ['Christian Pulisic'],
    [SM_JUVENTUS_ID]: ['Weston McKennie'],
    [SM_BORUSSIA_DORTMUND_ID]: ['Giovanni Reyna'],
    [SM_WOLFSBURG_ID]: ['John Brooks'],
    [SM_RB_LEIPZIG_ID]: ['Tyler Adams'],
    [SM_NEWCASTLE_UNITED_ID]: ['DeAndre Yedlin'],
    [SM_FRANKFURT_ID]: ['Timothy Chandler'],
    [SM_FULHAM_ID]: ['Tim Ream', 'Antonee Robinson'],
    [SM_BOAVISTA_ID]: ['Reggie Cannon'],
    [SM_BARCELONA_ID]: ['Sergino Dest'],
    [SM_LILLE_ID]: ['Timothy Weah'],
    [SM_WERDER_BREMEN_ID]: ['Josh Sargent'],
    [SM_MANCHESTER_CITY_ID]: ['Zack Steffen'],
    [SM_BESIKTAS_ID]: ['Tyler Boyd'],
    [SM_CAEN_ID]: ['Nicholas Gioacchini'],
    [SM_SUNDERLAND_ID]: ['Lynden Gooch'],
    [SM_DERBY_COUNTY_ID]: ['Duane Holmes'],
    [SM_INTERNACIONAL_ID]: ['Johnny Cardoso'],
    [SM_SC_HEERENVEEN_ID]: ['Ulysses Llanez'],
    [SM_GREUTHER_FURTH_ID]: ['Julian Green'],
    [SM_HERACLES_ID]: ['Luca de la Torre'],
    [SM_AUSTRIA_WIEN_ID]: ['Erik Palmer-Brown'],
    [SM_ST_TRUIDEN_ID]: ['Chris Durkin'],
    [SM_SC_TELSTAR_ID]: ['Sebastian Soto'],
    [SM_BURTON_ALBION_ID]: ['Indiana Vassilev'],
    [SM_ANDERLECHT_ID]: ['Matt Miazga']
};

const REGION_TO_API_KEY = {
    [REGION_EU]: 'tmf92zuvmrr873zjfugugwfd',
    [REGION_AM]: '8rycq5wra9sp4sdrbuchkh4g',
    [REGION_OTHER]: 'a7agjcd3cy6nzzycpcydyhv3'
};

const SM_API_KEY = 'ZRZpZHNqYHR4TJSBB0tT7oaja9oqHKiw0F1TAuW7JuVY7PQscXDlui1aLZmo';

module.exports = {TEAMS, TEAM_ID_TO_NAME, TEAM_ID_TO_REGION, TEAM_ID_TO_PLAYERS, REGION_TO_API_KEY, SM_API_KEY, SM_TEAMS, SM_TEAM_ID_TO_NAME, SM_TEAM_ID_TO_PLAYERS};