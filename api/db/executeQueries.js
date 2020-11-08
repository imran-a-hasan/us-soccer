const mysql = require('mysql2');
const redis = require('redis');
const moment = require('moment');

const redisOptions ={
    host: 'ussoccer-cache.zchv6f.0001.use1.cache.amazonaws.com',
    port: 6379
};

const connection = mysql.createConnection({
    host: 'ussoccerdb.cdvnopviopp5.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'password',
    database: 'us_soccer'
});


exports.handler = (event, context, callback) => {
    const redisClient = redis.createClient(redisOptions);
    connection.connect();
    connection.query('DELETE FROM Schedule');
    event.forEach(query => {
        console.log('executing ' + query);
        connection.query(query);
    });
    const month = moment().month();
    redisClient.del(`results-${month}`)
    redisClient.quit();
    connection.end();
};