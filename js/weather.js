let weatherColors = [
    "#DDBEC7", "#DD6687", "#FBCE9B"
];

    let weather = document.querySelector(".weather");

    function pick(){
        let picked = weatherColors[random(0,weatherColors.length)];
        return picked;
    }

    function random(start, end){
        return Math.floor(Math.random() * (end - start) + start);
    }

    setInterval(() => {
        weather.style.background = pick();
    }, 20000);