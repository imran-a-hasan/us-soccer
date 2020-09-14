import requests;
import json;
import urllib.request;
import cairosvg;

leagues = [2001, 2017, 2021, 2003, 2002, 2015, 2019, 2014, 2016, 2013]

for league in leagues:
    x = requests.get(
        'http://api.football-data.org/v2/competitions/' + str(league) + '/teams', 
        headers = {
            'X-Auth-Token': '81ef26d68a9c4931a12738e1143b3a63'
        }
    )
    res = json.loads(x.text)
    for team in res['teams']:
        id = team['id']
        if (team['crestUrl']):
            cairosvg.svg2png(url=team['crestUrl'], write_to='teams/' + str(id) + '.png')