//start buttton

var startGameButton = document.getElementById('js-startGameButton');
startGameButton.addEventListener('click',newGame);

// buttony gracza
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');
// buttony gracza po kliknieciu
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });
// logika gry 
// 1. wartosci na poczatku

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

// 2. wyswietlanie elem gry (kazda sekcja ma id)
    
    var newGameButton = document.getElementById('js-startGameButton'),
        newGameElement = document.getElementById('js-newGameElement'),
        pickElement = document.getElementById('js-playerPickElement'),
        resultsElement = document.getElementById('js-resultsTableElement');

// funkcja, wyswietlanie elem zalezne od stanu gry

function setGameElements () {
    switch(gameState) {        //Use the switch statement to select one of many blocks of code to be executed
        case 'started' :                                // nie widzimy kontenera z rozpoczeciem gry
            newGameElement.style.display = 'none';
            pickElement.style.display = 'block';
            resultsElement.style.display = 'block';
            break;
        case 'ended' :                                  // przycisk rozpoczynania gry ma miec napis
            startGameButton.innerText = 'Jeszcze raz!';
        case 'notStarted' :    
        default:                        //  przed rozpoczeciem gry: nie mamy innych sekcji poza pierwszej
            newGameElement.style.display = 'block';
            pickElement.style.display ='none';
            resultsElement.style.display = 'none';    
    }
}           
setGameElements ();

// rozpoczecie 1. zmienne ktore beda aktualizowane przez rozpoczeciem gry

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
    player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
    if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }
}
// wybor gracza

function getComputerPick() {
    var possiblePicks = ['rock','paper','sissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    
    checkRoundWinner(playerPick, computerPick);
}
// logika i punkty 

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock') ) {
        
        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana jest twoja!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrał komputer";
        computer.score++;
    }
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}
setGamePoints()

function over() {
    if(player.score === 10 || computer.score === 10) {
        gameState = 'ended';
    } 
} 
setGameElements ();
