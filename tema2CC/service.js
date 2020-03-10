btwObj = {
    'character': 'heroes',
    'heroes': 'heroes',
    'villain': 'villains',
    'villains': 'villains',
    'comics': 'comics',
    'comic': 'comics',
    'movies': 'movies',
    'affiliate': 'affiliates',
    'enemy': 'enemies',
    'movie': 'movies',
    'team': 'teams',
    'movie': 'title',
    'alias': 'aliases',
    'hero': 'hero',
    'villain': 'villain',
    'realName': 'name',
    'imdb': 'imdbRating'
};
let toCollName = {
    'heroes': 'hero',
    'villains': 'villain',
    'movies': 'title'
}

const mongo = require('mongodb').MongoClient;
let dbManager = require('./dbManager')();
const url = 'mongodb://localhost:27017';

function Service() {

    function buildFilter(isList, splitedUrl) {
        let filter = {};
        if (isList === true) {
            for (let i = 1; i < splitedUrl.length; i++) {
                let splitedEl = splitedUrl[i].split('=');
                filter[splitedEl[0]] = splitedEl[1];
            }
        } else {
            filter[toCollName[splitedUrl[0]]] = splitedUrl[1];
        }

        return filter;
    }

    function filterResult(filter, reslt) {
        console.log('this is filter again!', filter);
        console.log(reslt);
        let keys = Object.keys(filter);
        let respObj = [];
        let toBeAdd = false;
        for (let i = 0; i < reslt.length; i++) {
            toBeAdd = true;
            for (let j = 0; j < keys.length; j++) {
                if (btwObj[keys[j]] === keys[j]) {
                    if (filter[keys[j]] !== reslt[i][btwObj[keys[j]]]) {
                        toBeAdd = false;
                    }
                } else {
                    let arr = reslt[i][btwObj[keys[j]]].split(',');
                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = arr[i].trim();
                        while (arr[i].indexOf(' ') >= 0) {
                            arr[i] = arr[i].replace(' ', '_');
                        }
                        arr[i] = arr[i].toLowerCase();
                    }
                    let oneMatch = false;
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === filter[keys[j]]) {
                            oneMatch = true;
                        }
                    }
                    if (oneMatch === false) {
                        toBeAdd = false;
                    }
                }
                if (toBeAdd === false) {
                    break;
                }
            }
            if (toBeAdd === true) {
                respObj.push(reslt[i]);
            }
        }
        return respObj;
    }

    function transformString(str) {
        str = str.trim();
        while (str.indexOf(' ') >= 0) {
            str = str.replace(' ', '_');
        }
        str = str.toLowerCase();
        return str;
    }

    function requestGet(isList, splitedUrl, req, res) {
        let collName = btwObj[splitedUrl[0]];
        filter = buildFilter(isList, splitedUrl);
        let actualFilter = {};
        if (isList === true) {
            actualFilter = {};
        } else {
            actualFilter = filter;
        }
        console.log('this is filter', filter);
        mongo.connect(url, { useUnifiedTopology: true }, function (err, client) {
            db = client.db('myDb');
            dbManager.findDocuments(db, collName, actualFilter, (resp) => {
                if (resp.length === 0) {
                    res.statusCode = 204;
                } else {
                    res.statusCode = 200;
                }
                res.setHeader('Content-Type', 'application/json');
                if (isList === false) {
                    res.end(JSON.stringify(resp));
                } else {
                    res.end(JSON.stringify(filterResult(filter, resp)));
                }
                client.close();
            });
        });
    }


    function makeInsert(db, arr, collName, index, res) {
        let filter = {};
        filter[toCollName[collName]] = arr[index][toCollName[collName]];
        dbManager.findDocuments(db, collName, filter, (resp) => {
            if (resp.length === 0) {
                dbManager.insertDocuments(db, [arr[index]], collName, (resp) => {
                    if (index + 1 < arr.length) {
                        makeInsert(db, arr, collName, index + 1, res);
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        let forClient = [];
                        for (let i = 0; i < arr.length; i++) {
                            let theKey = '';
                            if (collName === 'heroes') {
                                theKey = 'hero';
                            } else if (collName === 'villains') {
                                theKey = 'villain';
                            } else if (collName === 'movies') {
                                theKey = 'movie';
                            }
                            // let dt = bodyObj[i][theKey].replace('')
                            forClient.push({ 'Location': '/' + collName + '/' + transformString(arr[i][theKey]) });
                        }
                        res.end(JSON.stringify(forClient));
                        return;
                    }
                });
            } else {
                res.statusCode = 409;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ status: 'Id ' + arr[index] + ' already exists!' }));
            }
        });

    }

    function requestPost(splitedUrl, req, res) {
        console.log(splitedUrl, splitedUrl.length);
        if (splitedUrl.length > 1) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({}));
        } else {
            body = '';
            req.on('data', (chunk) => {
                body += chunk;
                // console.log(Array.isArray(JSON.parse(body)));
                let bodyObj = JSON.parse(body);
                mongo.connect(url, { useUnifiedTopology: true }, function (err, client) {
                    db = client.db('myDb');
                    if (Array.isArray(bodyObj) === false) {
                        bodyObj = [bodyObj];
                    }
                    makeInsert(db, bodyObj, splitedUrl[0], 0, res);
                });
            });
        }
    }

    function requestDelete(splitedUrl, req, res) {
        if (splitedUrl.length > 1) {
            res.setHeader('Content-Type', 'application/json');
            let obj = {};
            mongo.connect(url, { useUnifiedTopology: true }, function (err, client) {
                let db = client.db('myDb');
                let nr = splitedUrl.length - 1;
                for (let i = 1; i < splitedUrl.length; i++) {
                    let tag = toCollName[splitedUrl[0]];
                    let filter = {};
                    filter[tag] = splitedUrl[i];
                    dbManager.removeDocument(db, splitedUrl[0], filter, (resp) => {
                        nr--;
                        if (nr === 0) {
                            res.statusCode = 200;
                            res.end(JSON.stringify({ status: 'All ids deleted!' }));
                        }
                    });
                }
            });
        } else {
            mongo.connect(url, { useUnifiedTopology: true }, function (err, client) {
                let db = client.db('myDb');
                dbManager.removeMore(db, splitedUrl[0], {}, (resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({}));
                });
            });
        }
    }

    function requestPut(splitedUrl, req, res) {
        if (splitedUrl.length > 1) {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
                body = JSON.parse(body);
                let nr = splitedUrl.length - 1;
                mongo.connect(url, { useUnifiedTopology: true }, function (err, client) {
                    let db = client.db('myDb');
                    let tag = toCollName[splitedUrl[0]];
                    let filter = {};
                    filter[tag] = splitedUrl[1];
                    dbManager.findDocuments(db, splitedUrl[0], filter, (resp) => {
                        if (resp.length === 0) {
                            res.statusCode = 404;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify([]));
                        } else {
                            if (Array.isArray(body) === true) {
                                body = body[0];
                            }
                            dbManager.updateDocument(db, splitedUrl[0], filter, body, (resp) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ status: 'Update done!' }));
                            });
                        }
                    });
                });
            });
        } else {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
                body = JSON.parse(body);
                console.log(body);
                if (Array.isArray(body) === true) {
                    body = body[body.length - 1];
                }
                mongo.connect(url, { useUnifiedTopology: true }, function (err, client) {
                    let db = client.db('myDb');
                    dbManager.updateDocument(db, splitedUrl[0], {}, body, (resp) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ status: 'All documents udpated!' }));
                    });
                });
            });
        }
    }

    return {
        requestGet: requestGet,
        requestPost: requestPost,
        requestDelete: requestDelete,
        requestPut: requestPut
    };
}

module.exports = Service;