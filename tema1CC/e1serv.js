// const request = require('request');

// request('http://www.splashbase.co/api/v1/images/random', { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body);
// });

const axios = require('axios');

// axios.post('https://api.random.org/json-rpc/2/invoke',{
    // jsonrpc: 2.0,
    // method:'generateIntegers',
    // params: {
    //     apiKey: 'e18c464a-5af6-4ff8-8868-20750cc8d3d1',
    //     n: 6,
    //     min: 1,
    //     max: 1001
    //   },
    // id: 0
// }).then(res => res.data)
// .then((res)=>{
//   console.log(res.result);
// }).catch((err)=>{
//   console.error(err);
// })


axios.get('https://api.whatdoestrumpthink.com/api/v1/quotes/random').
  then(res => res.data).
  then((resp) => {
    console.log(resp);
  });

