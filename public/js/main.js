let hunger = 100;
let hygienic = 100;
let happiness = 100;
let coins = 100;
let countFree = 2;
let eatFood = 4;
let levelPet = 0;
let level = 1;
var circleHungerProgress = document.querySelector('#progressBarHung');
var circleHappinessProgress = document.querySelector('#progressBarHapp');
var circleHygienicProgress = document.querySelector('#progressBarHygienic');
let dogFeel = document.getElementById("dogFeel");
let hungryPet = document.getElementById("hungryPet");
let free = document.getElementById("countFree");
let coinTab = document.getElementById("coins")
let foodDog = document.getElementById("foodDog");
let startGame = document.getElementById("startGame");
let mainGame = document.getElementById("mainGame");
let noteGame = document.getElementById("noteGame");
let notiGameTile = document.getElementById("noti-game-title");
let gameOver = document.getElementById("gameOver");
let coin = document.querySelector('.coinAnimation');
let progressLevel = document.getElementById('progressLevel');
let levelNumber = document.getElementById('levelNumber');
audio = new Audio();
let pickUpCoin = () => {
    coin.style.left = randomNumber(200, 1140) + "px";
    if (level <= 1) {
        coins += 10;
    }
    else {
        coins += ((level * 2) + 10);
    }
    coinTab.textContent = coins;
    coin.style.display = "none";
}
let randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}
coin.style.left = 450 + "px";
setInterval(() => {
    setTimeout(() => {
        coin.style.display = "block";

    }, 10001);
}, 10000);
function numberLevel(level) {
    if (level < 10) {
        level = "0" + level;
    }
    else {
        return level;
    }
    return level;
}
function setCircleHungerProgress(hunger) {
    var radius = circleHungerProgress.r.baseVal.value;
    // Áp dụng công thức diện tích hình tròn : S =r*2.PI để tính 
    var circumference = radius * 2 * Math.PI;
    circleHungerProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    circleHungerProgress.style.strokeDashoffset = `${circumference}`;
    const offset = circumference - (hunger / 100) * circumference;
    circleHungerProgress.style.strokeDashoffset = offset;
    console.log('offset: ', offset);
    // console.log(hunger);
    // const circumference = circleHungerProgress.getTotalLength();
    // circleHungerProgress.style.strokeDashoffset = circumference - (hunger/100) * circumference;

}
function setCircleHappinessProgress(happiness) {
    var radius = circleHappinessProgress.r.baseVal.value;
    // Áp dụng công thức diện tích hình tròn : S =r*2.PI để tính 
    var circumference = radius * 2 * Math.PI;
    circleHappinessProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    circleHappinessProgress.style.strokeDashoffset = `${circumference}`;
    const offset = circumference - (happiness / 100) * circumference;
    circleHappinessProgress.style.strokeDashoffset = offset

}
function setCircleHygienicProgress(hygienic) {
    var radius = circleHygienicProgress.r.baseVal.value;
    // Áp dụng công thức diện tích hình tròn : S =r*2.PI để tính 
    var circumference = radius * 2 * Math.PI;
    circleHygienicProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    circleHygienicProgress.style.strokeDashoffset = `${circumference}`;
    const offset = circumference - (hygienic / 100) * circumference;
    circleHygienicProgress.style.strokeDashoffset = offset;
}
function setImageDog(hunger) {
    if (hunger > 50) {
        dogFeel.style.display = "block";
        hungryPet.style.display = "none"
    } else {
        dogFeel.style.display = "none";
        hungryPet.style.display = "block"
    }
}
function showNoti() {
    noteGame.style.display = "block";
}

function setLevelProgress(data) {
    progressLevel.setAttribute('aria-valuenow', data);
    progressLevel.setAttribute('style', 'width:' + Number(data).toFixed(0) + '%');
}

function onBuy(name, price) {
    if (name === "food") {
        if (countFree < 0) {
            // free.textContent = 0;
            free.style.display = "none";
            if (coins < 20) {
                showNoti();
                notiGameTile.innerHTML = `
                    <span>KHÔNG ĐỦ</span>
                    <br>
                    <b>TIỀN</b>
                `
                //    show thông báo số tiền không đủ
            }
            else if (coins >= 20) {
                foodDog.src = "./public/images/dodungtas-removebg.png"
                eatFood += 2;
                countFree = Math.round(eatFood / 2);
                coins -= price;
                // hunger += price;
                // if (coins < 0) { coins = 0; };
                // if (hunger > 100) { hunger = 100; };
                coinTab.textContent = coins;
                // setCircleHungerProgress(hunger);
            }
        }
        else {
            if (coins < 20) {
                showNoti();
                notiGameTile.innerHTML = `
                <span>KHÔNG ĐỦ</span>
                <br>
                <b>TIỀN</b>
                `
                //    show thông báo số tiền không đủ
            }
            else if (coins >= 20) {
                foodDog.src = "./public/images/dodungtas-removebg.png"
                eatFood += 2;
                countFree = Math.round(eatFood / 2);
                free.style.display = "block";
                free.textContent = countFree;
                coins -= price;
                // coins -= price;
                // hunger += price;
                // if (coins < 0) { coins = 0; };
                // if (hunger > 100) { hunger = 100; };
                coinTab.textContent = coins;
                // setCircleHungerProgress(hunger);
            }
        }
    }
    else if (name === "happiness") {
        if (happiness >= 100) {
            // show thông báo cảm xúc đã 100%
            showNoti();
            notiGameTile.innerHTML = `
                <span>THÚ CƯNG ĐANG</span>
                <br>
                <b>RẤT VUI VẺ</b>
            `
        }
        else if (coins < price) {
            //   show thông báo tiền không đủ
            showNoti();
            notiGameTile.innerHTML = `
            <span>KHÔNG ĐỦ</span>
            <br>
            <b>TIỀN</b>
            `
        } else if (coins >= price) {
            coins -= price;
            happiness += price;
            if (coins < 0) { coins = 0; };
            if (happiness > 100) { happiness = 100; }
            if (level >= 5) {
                levelPet += price * (1 / 3);
            }
            else { levelPet += (price / 2) }
            if (levelPet >= 100) {
                levelPet = 100;
                level += 1;
                levelPet = 0;
            }
            setLevelProgress(levelPet);
            setCircleHappinessProgress(happiness);
            coinTab.textContent = coins
            levelNumber.textContent = numberLevel(level);
        }
    }
    else if (name === "hygienic") {
        if (hygienic >= 100) {
            // show thông báo cảm xúc đã 100%
            showNoti();
            notiGameTile.innerHTML = `
                <span>THÚ CƯNG ĐÃ</span>
                <br>
                <b>SẠCH SẼ</b>
            `
        }
        else if (coins < price) {
            //   show thông báo tiền không đủ
            showNoti();
            notiGameTile.innerHTML = `
            <span>KHÔNG ĐỦ</span>
            <br>
            <b>TIỀN</b>
            `
        } else if (coins >= price) {
            coins -= price;
            hygienic = 100;
            if (coins < 0) { coins = 0; };
            if (hygienic > 100) { hygienic = 100; }
            if (level >= 5) {
                levelPet += price * (1 / 3);
            }
            else { levelPet += (price / 2) }
            if (levelPet >= 100) {
                levelPet = 100;
                level += 1;
                levelPet = 0;
            }
            setLevelProgress(levelPet);
            setCircleHygienicProgress(hygienic);
            coinTab.textContent = coins;
            levelNumber.textContent = numberLevel(level);
        }
    }
}

dogFeel.onclick = function () {
    happiness += 1;
    if (happiness > 100) { happiness = 100; }
    setCircleHappinessProgress(happiness);

}

foodDog.onclick = function () {
    if (eatFood > 0) {
        if (hunger >= 100) {
            showNoti();
            notiGameTile.innerHTML = `
                <span>THÚ CƯNG ĐÃ</span>
                <br>
                <b>NO SAY</b>
            `
            //    show thông báo thức ăn đã 100%
        } else {
            if (countFree == 0) {
                free.style.display = "none";
            }
            eatFood = eatFood - 1;
            countFree = Math.round(eatFood / 2);
            // alert("🖕🖕");
            free.textContent = countFree;
            if (eatFood >= 0) {
                hunger += 20;
                if (coins < 0) { coins = 0; };
                if (hunger > 100) { hunger = 100; };
                if (level >= 5) {
                    levelPet += 20 * (1 / 3);
                }
                else { levelPet += (20 / 2) }
                if (levelPet >= 100) {
                    levelPet = 100;
                    level += 1;
                    levelPet = 0;
                }
                setLevelProgress(levelPet);
                setCircleHungerProgress(hunger);

                levelNumber.textContent = numberLevel(level);
            }
            else {
                eatFood = 0;
                foodDog.src = "./public/images/trong-removebg-preview.png"
            }
            if (eatFood == 0) {
                foodDog.src = "./public/images/trong-removebg-preview.png"
                free.style.display = "none";
            }
        }
    }
    else {
        showNoti();
        notiGameTile.innerHTML = `
            <span>THỨC ĂN CỦA</span>
            <br>
            <b>THÚ CƯNG ĐÃ HẾT</b>
        `
    }
}

function onStartGame() {
    startGame.style.display = "none";
    mainGame.style.display = "block";
    playAudioGame()
    onStart();
    setInterval(onStart, 5000);
}
function playAudioGame() {
    audio.src = "./public/images/music-game-main.mp3";
    audio.loop = true;
    audio.oncanplaythrough = (event) => {
        var playedPromise = audio.play();
        if (playedPromise) {
            playedPromise.catch((e) => {
                console.log(e)
                if (e.name === 'NotAllowedError' || e.name === 'NotSupportedError') {
                    console.log(e.name);
                }
            }).then(() => {
                console.log("playing sound !!!");
            });
        }
    }
    // Set object references
    playbtn = document.getElementById("playpausebtn");
    playbtn.addEventListener("click", playPause);
    function playPause() {
        if (audio.paused) {
            audio.play();
            playbtn.style.background = "url(./public/images/pause.svg) no-repeat";
        } else {
            audio.pause();
            playbtn.style.background = "url(./public/images/play.svg) no-repeat";
        }
    }
}
noteGame.onclick = function () {
    noteGame.style.display = "none";
}
function continueGame() {
    audio.pause();
    coins -= coins;
    setTimeout(() => {
        count = 0;
        hunger = 100;
        hygienic = 100;
        happiness = 100;
        coins = 100;
        eatFood = 4;
        level = 1;
        levelPet = 0;
        coinTab.textContent = coins;
        countFree = Math.round(eatFood / 2);
        free.textContent = countFree;
    }, 100);
    // audio.play();
    playAudioGame()
    onStart();
    setImageDog(hunger);
    setInterval(onStart, 3000);
    gameOver.style.display = "none";
}
function blackGame() {
    gameOver.style.display = "none";
    noteGame.style.display = "none";
    startGame.style.display = "block";
    mainGame.style.display = "none";
    count = 0;
    hunger = 100;
    hygienic = 100;
    happiness = 100;
    coins = 100;
    eatFood = 4;
    level = 1;
    levelPet = 0;
    coinTab.textContent = coins;
    countFree = Math.round(eatFood / 2);
    free.textContent = countFree;
    audio.pause();
    audio.src = "";
    // audio.play();
}
let onStart = () => {

    hygienic -= 6;
    hunger -= 2;
    happiness -= 4;
    if (hygienic <= 0 || hunger <= 0 || happiness <= 0) {
        audio.pause();
        gameOver.style.display = "block";
        circleHygienicProgress.style.strokeDashoffset = 0;
        circleHappinessProgress.style.strokeDashoffset = 0;
        circleHungerProgress.style.strokeDashoffset = 0;
    } else {
        setCircleHungerProgress(hunger);
        setCircleHappinessProgress(happiness);
        setCircleHygienicProgress(hygienic);
        setImageDog(hunger);

    }
}
window.onload = function () {
    gameOver.style.display = "none";
    noteGame.style.display = "none";
    startGame.style.display = "block";
    mainGame.style.display = "none";
}