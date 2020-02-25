let logsArray;

function populate() {
    for (let i = 0; i < logsArray.length; i++) {
        let p = document.createElement('p');
        p.style.color = 'white';
        p.innerText = 'RequestUrl: ' + logsArray[i][0];
        document.body.appendChild(p);
        p = document.createElement('p');
        p.style.color = 'white';
        p.innerText = 'Latency: ' + logsArray[i][3] + 'ms';
        document.body.appendChild(p);
        let btn = document.createElement('button');
        btn.innerText = 'reqBody';
        document.body.appendChild(btn);
        btn.id = i + '_1';
        btn = document.createElement('button');
        btn.innerText = 'respBody';
        btn.id = i + '_2';
        document.body.appendChild(btn);
        if(i%3 == 2){
            document.body.innerHTML += '<br><br><br>';
        }
        // for (let j = 0; j < 2; j++) {
        //     let p = document.createElement('p');
        //     p.innerText = JSON.stringify(logsArray[i][j]);
        //     p.style.color = 'white';
        //     document.body.appendChild(p);
        // }

    }

    document.body.addEventListener('click',(e)=>{
        console.clear();
        let [nr,nr2] = e.target.id.split('_');
        nr = parseInt(nr);
        nr2 = parseInt(nr2);
        console.log(logsArray[nr][nr2]);
    });
}

fetch('http://localhost:80/logs').then(res => res.json()).then(
    (res) => {
        // console.log(res);
        logsArray = res;
        populate();
    }
);