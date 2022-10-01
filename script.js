const score$$ = document.querySelector('.score');
const game$$ = document.querySelectorAll('.hole');
const easy$$ = document.querySelector('#easy');
const mid$$ = document.querySelector('#mid');
const hard$$ = document.querySelector('#hard');
let time$$ = document.querySelector('#timer');
let lb$$ = document.querySelector('#lb');
let time = 10;
let gameInterval;
let moleInterval;
let timer = 1400;
let timeUp = false;
let gameGoing = false;
let lastPosition = 9;
easyDif = () => {
    if(!gameGoing){
        easy$$.classList.remove("hover");
        mid$$.classList.remove("hover");
        hard$$.classList.remove("hover");
        easy$$.classList.add("hover");
        timer = 900;
    }
}
midDif = () => {
    if(!gameGoing){
        easy$$.classList.remove("hover");
        mid$$.classList.remove("hover");
        hard$$.classList.remove("hover");
        mid$$.classList.add("hover");
        timer = 700;
    }
}
hardDif = () => {
    if(!gameGoing){
        easy$$.classList.remove("hover");
        mid$$.classList.remove("hover");
        hard$$.classList.remove("hover");
        hard$$.classList.add("hover");
        timer = 500;
    }
}
easy$$.addEventListener('click', easyDif);
mid$$.addEventListener('click', midDif);
hard$$.addEventListener('click', hardDif);
createRandom = () => Math.floor(Math.random()*9);
añadePunto = (position) => {
    score$$.textContent++;
    for (let i = 0 ; i < game$$.length ; i++) {
        game$$[i].removeEventListener('click', añadePunto);    
    }
}
generaTopo = () => {
    if(!timeUp) {
        let position = createRandom();
        while (position === lastPosition) position = createRandom();
        lastPosition = position;        
        game$$[position].classList.add('up');
        game$$[position].addEventListener('click', añadePunto);
        setTimeout(() => {
            game$$[position].classList.remove('up');
            game$$[position].removeEventListener('click', añadePunto);
        }, timer);
    }
}
countdown = () => {
    time--;
    time$$.textContent = time;
}

startGame = () => {
    if (!gameGoing) {
        gameGoing = true;
        score$$.textContent = 0;
        timeUp = false;
        time = 10;
        time$$.textContent = time;
        generaTopo();
        countInterval = setInterval(() => countdown(), 1000);
        gameInterval = setTimeout(() => stopGame(), 10000);
        moleInterval = setInterval(() => generaTopo(), timer+200);
    }
}
stopGame = () => {
    gameGoing = false;
    timeUp = true;
    clearInterval(moleInterval);
    clearTimeout(gameInterval);
    clearInterval(countInterval);
    if(time === 0) setTimeout(() => submitScore(score$$.textContent), 1400);
}
sortNumbers = () => {
    let switching, shouldSwitch, i;
    switching = true;
    while (switching) {
        switching = false;
        for (i = 0; i < lb$$.rows.length; i++) {
            shouldSwitch = false;
            if (lb$$.rows[i].textContent < lb$$.rows[i+1].textContent) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            lb$$.rows[i].parentNode.insertBefore(lb$$.rows[i+1], lb$$.rows[i]);
            switching = true;
        }
    }
} 
addDifficulty = () => {
    if(timer === 900) return (' on Easy');
    else if(timer === 700) return (' on Medium');
    else return (' on Hard');
}   
submitScore = (score) => {
    let cont;
    let row$$ = document.createElement('tr');
    let score$$ = document.createElement('td');
    let scoretext$$ = document.createTextNode(score);
    if(score > 0) {
        if(lb$$.rows.length === 0) {
            if(score < 10) scoretext$$.textContent = '0' + score + addDifficulty();
            else scoretext$$.textContent = score + addDifficulty();
            score$$.appendChild(scoretext$$);
            row$$.appendChild(score$$);
            lb$$.appendChild(row$$);
        }
        else if(lb$$.rows.length < 7) {
            cont = 0;
            if(score < 10) scoretext$$.textContent = '0' + score + addDifficulty();
            else scoretext$$.textContent = score + addDifficulty();
            for(let i = 0 ; i < lb$$.rows.length ; i++) {
                if (scoretext$$.textContent === lb$$.rows[i].textContent) cont = 1;
            }
            if(cont === 0) {
                score$$.appendChild(scoretext$$);
                row$$.appendChild(score$$);
                lb$$.appendChild(row$$);
                if(lb$$.rows.length > 1) sortNumbers();
            }
        }
        else {
            if(lb$$.rows[6].textContent < score) {
                if(score < 10) lb$$.rows[6].textContent = '0' + score + addDifficulty();
                else lb$$.rows[6].textContent = score + addDifficulty();
                sortNumbers();
            }
        }
    }
}