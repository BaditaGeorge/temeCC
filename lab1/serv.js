const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

let rawData = fs.readFileSync('config.json');
let confObj = JSON.parse(rawData);
// console.log(confObj);


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
PORT = 80;
let logs = [];
// let resps = [];

app.listen(PORT, () => {
    console.log('listening..');
});

app.get('/main', (req, res) => {
    res.sendFile('./tema1.html', { root: __dirname });
});

app.get('/randomImage', (req, res) => {
    axios.get('http://www.splashbase.co/api/v1/images/random').
        then(res => res.data).
        then((resp) => {
            res.send(resp);
        });
});

app.get('/metrics', (req, res) => {
    res.sendFile('./metrics.html', { root: __dirname });
});


app.get('/logs', (req, res) => {
    res.send(logs);
});

async function asyncHandle(res) {
    return new Promise(resolve => {
        let resps = [];

        async function requestApi(url, type, body, tempLogs) {
            let firstTimer, secondTimer;

            firstTimer = new Date().getTime();
            if (body !== undefined) {
                return new Promise(resolve => {
                    axios[type](url, body).then(resp => resp.data).then((resp) => {
                        resps.push(resp);
                        secondTimer = new Date().getTime();
                        tempLogs.push([url, body, resp, (secondTimer - firstTimer)]);
                        resolve();
                    });
                });
            } else {
                return new Promise(resolve => {
                    axios[type](url).then(resp => resp.data).then((resp) => {
                        resps.push(resp);
                        secondTimer = new Date().getTime();
                        tempLogs.push([url, undefined, resp, (secondTimer - firstTimer)]);
                        resolve();
                    });
                });
            }
        }


        async function callApis() {
            let firstTimer, secondTimer;
            let tLogs = [];
            await requestApi('https://api.random.org/json-rpc/2/invoke', 'post',
                {
                    jsonrpc: 2.0,
                    method: 'generateIntegers',
                    params: {
                        apiKey: confObj.random_key,
                        n: 2,
                        min: 1,
                        max: 60
                    },
                    id: 0
                },tLogs);

            await requestApi('https://api.chucknorris.io/jokes/random', 'get', undefined, tLogs);


            let cnJoke;
            let numbers;
            // console.log(cnJoke);
            // console.log(numbers);

            if (resps[0].result === undefined) {
                cnJoke = resps[0].value;
                numbers = resps[1].result.random.data;
                // console.log(resps[1].result.random.data);
            } else {
                cnJoke = resps[1].value;
                numbers = resps[0].result.random.data;
                // console.log(resps[0].result.random.data);
            }

            let nrOfChars = Math.floor(Math.random() * 4) + 2;

            for (let i = 0; i < nrOfChars; i++) {
                numbers[0] += (cnJoke.charCodeAt(i) / 100);
            }

            nrOfChars = Math.floor(Math.random() * 4) + 2;
            for (let i = 0; i < nrOfChars; i++) {
                numbers[1] += (cnJoke.charCodeAt(cnJoke.length - i - 1) / 100);
            }

            await requestApi('https://api.opencagedata.com/geocode/v1/json?q=' + numbers[0] + '+' + numbers[1] + '&key=' + confObj.opencage_key, 'get',undefined,tLogs);

            let regions;
            if (resps[2].results[0].annotations.UN_M49 === undefined) {
                regions = { 'location': 'Planetary Ocean' };
            } else {
                regions = resps[2].results[0].annotations.UN_M49.regions;
            }
            logs.push(tLogs[0]);
            logs.push(tLogs[1]);
            logs.push(tLogs[2]);
            res.send(regions);
        }

        callApis();
        resolve();
    });
}

app.get('/gogoApi', async (req, res) => {
    await asyncHandle(res);
});

