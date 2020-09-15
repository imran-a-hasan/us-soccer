import requests;
import json;
import urllib.request;
import cairosvg;
import time;

eu = [17, 23, 35, 37, 34, 52, 7, 679]
other = [18, 21, 19, 24, 334, 328, 53, 217, 336, 330, 182, 335, 333, 96]
am = [325]

leagues = eu + other + am

euKey = 'tmf92zuvmrr873zjfugugwfd'
amKey = '8rycq5wra9sp4sdrbuchkh4g'
otherKey = 'a7agjcd3cy6nzzycpcydyhv3'

seen = {}

id = 3003

for league in leagues:
    time.sleep(2)

    region = 'eu'
    key = euKey

    if league in other:
        region = 'other'
        key = otherKey
    elif league in am:
        region = 'am'
        key = amKey

    url = 'https://api.sportradar.us/soccer-t3/' + region + '/en/tournaments/sr:tournament:' + str(league) + '/info.json?api_key=' + key
    
    x = requests.get(url)
    res = json.loads(x.text)
    for group in res['groups']:
        for team in group['teams']:
            id =  (team['id'])[14:]
            if id not in seen:
                x = requests.get('https://sportteamslogo.com/api?key=e3d57026f2614c0ca9054711d49392ba&size=medium&tid=' + str(id))
                if x.status_code == 200:
                    with open('teams/' + str(id) + '.png', 'wb') as f:
                        for chunk in x:
                            f.write(chunk)
            seen[id] = True
