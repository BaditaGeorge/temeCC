fetch('http://www.splashbase.co/api/v1/images/random').then(resp=>resp.json()).then(res => {
    let img = document.createElement('img');
    img.src = res.url;
    document.body.appendChild(img);
});