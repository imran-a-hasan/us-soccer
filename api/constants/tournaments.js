const REGION_EU = 'eu';
const REGION_AM = 'am';

const TOURNAMENT_NAMES = {
    'sr:tournament:44': '2. Bundesliga',
    'sr:tournament:45': 'Austrian Bundesliga'
};

const TOURNAMENT_TO_REGION_CODE = {
    'sr:tournament:38': REGION_EU,
    'sr:tournament:17': REGION_EU,
    'sr:tournament:34': REGION_EU,
    'sr:tournament:35': REGION_EU,
    'sr:tournament:185': REGION_EU,
    'sr:tournament:7': REGION_EU,
    'sr:tournament:679': REGION_EU,
    'sr:tournament:465': REGION_EU,
    'sr:tournament:23': REGION_EU,
    'sr:tournament:37': REGION_EU,
    'sr:tournament:238': REGION_EU,
    'sr:tournament:203': REGION_EU,
    'sr:tournament:8': REGION_EU,
    'sr:tournament:52': REGION_EU,
    'sr:tournament:218': REGION_EU,
    'sr:tournament:325': REGION_AM,
    'sr:tournament:384': REGION_AM,
}

module.exports = {TOURNAMENT_NAMES, TOURNAMENT_TO_REGION_CODE};