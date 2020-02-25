const axios = require('axios');
const fs = require('fs');
// const async = require('async');

let arrObj = [];
let batches = 0;
let numberOf = 10;

function makeRequests(index){
    let currTime = new Date().getTime();
    let execTimes = [];
    let batchSize = 8;
    let size = batchSize;
    for(let i=0;i<size;i++){
        axios.get('http://localhost:80/gogoApi')
        .then(resp => {
            let obj = {};
            obj = {};
            obj.status = resp.status;
            obj.statusText = resp.statusText;
            obj.headers = resp.headers;
            obj.config = {};
            obj.config.url = resp.config.url;
            obj.config.method = resp.config.method;
            obj.data = resp.data;
            let exec = new Date().getTime() - currTime;
            obj['latency'] = exec;
            arrObj.push(obj);
            batchSize--;
            if(batchSize === 0){
                // console.log(execTimes);
                if(index + 1 < numberOf){
                    makeRequests(index+1);
                }else{
                    // console.log(JSON.stringify(arrObj[0]));
                    fs.writeFileSync('out3.json',JSON.stringify(arrObj));
                }
            }
        });
    }
}

makeRequests(0);