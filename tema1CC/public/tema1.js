function getRandomImage(){
    fetch('http://localhost:80/randomImage').then(res => res.json()).then((res)=>{
        if(document.getElementById('imgH') !== null){
            document.body.removeChild(document.getElementById('imgH'));
        }
        let img = document.createElement('img');
        img.id = 'imgH';
        img.width = 400;
        img.height = 400;
        img.src = res.url;
        document.body.appendChild(img);
    });
}

function callApi(){
    fetch('http://localhost:80/gogoApi').then(res=>res.json()).then((res)=>{
        console.log(res);
    });
}

function faceLift(){
    let btn;
    document.body.style.backgroundColor = 'black';
    btn = document.createElement('button');
    btn.innerText = 'Random Image?';
    btn.addEventListener('click',getRandomImage);
    document.body.appendChild(btn);
    btn = document.createElement('button');
    btn.innerText = 'Put API to work!';
    btn.addEventListener('click',callApi);
    document.body.appendChild(btn);
}


faceLift();