const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
let service = require('./service')();

function parseUrl(url) {
    let splitedUrl = url.split('/');
    splitedUrl.splice(0, 2);
    if (splitedUrl.length === 1) {
        splitedUrl[0] = splitedUrl[0].split('?');
        splitedUrl = splitedUrl[0];
        if (splitedUrl.length > 1) {
            arr = splitedUrl[1].split('&');
            for (let el of arr) {
                splitedUrl.push(el);
            }
            splitedUrl.splice(1, 1);
        }
        return [true, splitedUrl];
    } else {
        return [false, splitedUrl];
    }
}

http.createServer((req, res) => {

    if (req.url.split('/')[1] === 'DCUApi') {
        if (req.method === 'GET') {
            let splitedUrl = parseUrl(req.url);
            service.requestGet(splitedUrl[0], splitedUrl[1], req, res);
        }

        if (req.method === 'POST') {
            let splitedUrl = req.url.split('/');
            splitedUrl.splice(0, 2);
            service.requestPost(splitedUrl, req, res);
        }

        if (req.method === 'DELETE') {
            let splitedUrl = req.url.split('/');
            splitedUrl.splice(0, 2);
            service.requestDelete(splitedUrl, req, res);
        }

        if(req.method === 'PUT'){
            let splitedUrl = req.url.split('/');
            splitedUrl.splice(0,2);
            service.requestPut(splitedUrl,req,res);
        }
    }

}).listen(port, hostname, () => {
    console.log('Server running!');
});