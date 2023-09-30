function querySelector(class_name){
   return document.querySelector(class_name)
}
function querySelectorAll(class_name){
    return document.querySelectorAll(class_name)
 }
 let black = "#2A2B2E",
     green = "#87FF65",
     yellow= "#e4ff1a",
     isAiMode = false;

// Game starts with a menu section, where player can choose the sign(x or o) and the enemy(human or robot)
// following piece of code creates a Toggle Switch functianality(on/off button) both for defining the sign and enemy
(function SwitchToggle() {
    // Select Sign
    const x = document.querySelector('.x'),o = document.querySelector('.o');
    // Select Enemy
    const robot = document.querySelector('.robot'),human = document.querySelector('.human');

    function switchColor(element1,element2) {
        
        // Activate element 1
        element1.style.color = black;
        element1.style.backgroundColor = green;
        // Deactivate element 2
        element2.style.color = green;
        element2.style.backgroundColor = black;
        if(element1==o){
            mainPlayer=players.playerO;
            enemyPlayer=players.playerX;
        } else if(element1==x){
            mainPlayer=players.playerX;
            enemyPlayer=players.playerO;
        } 
        else if(element1==robot){
            isAiMode = true;
        }
        else if(element1==human){
            isAiMode = false;
        }
    }

    x.addEventListener('click', function() {switchColor(x, o); });
    o.addEventListener('click', function() { switchColor(o, x); });
    human.addEventListener('click', function() {switchColor(human, robot); });
    robot.addEventListener('click', function() { switchColor(robot, human); });
})();



// After defining the sign and enemy, we are ready to start our game :)
// With a click of a start button our board game shows off.
// Technically one section "menu" displayes as none and next section "game" turns on 
// Same method applied when we return back to the menu section after playing a game
querySelector('.buttom').addEventListener('click', startGame);
querySelectorAll('.return').forEach(element =>{element.addEventListener('click', goBack)});

function startGame() {
    querySelector('.menu_section').style.display = "none";
    querySelector('.game_section').style.display = "grid";
    querySelector('.game_section').style.filter="blur(0px)";
}

function goBack(){
    querySelector('.menu_section').style.display = "grid";
    querySelector('.game_section').style.display = "none";
    querySelector('.result_section').style.display="none";
    querySelector('.game_section').style.filter="blur(0px)";
    gameController.startNewGame()
}

// Game

const players =(()=>{
    function player(sign,color,score,position,winner) {
        this.sign = sign;
        this.color = color;
        this.score = score;
        this.position = position;
        this.winner = winner;
    }
    const playerX = new player("X", yellow,0, [], false);
    const playerO = new player("O", green, 0, [], false);
    const insertMove= (index) =>{
        activePlayer.position.push(index);
    }
    const giveScore= () =>{
        activePlayer.score++;
    }
    const resetPlayersPosition= () =>{
        playerX.position=[];
        playerO.position=[];
    }
    const resetPlayersScore= () =>{
        playerX.score=0;
        playerO.score=0;
    }
    const resetPlayersWin= () =>{
        playerX.winner=false;
        playerO.winner=false;
    }

    return {playerX, playerO, insertMove, giveScore,resetPlayersPosition,resetPlayersScore,resetPlayersWin}
})();

let gameBoard = ["", "", "","","","", "","", ""],
    mainPlayer=players.playerX,
    enemyPlayer=players.playerO;

const board =(()=>{
    
    const insertMove = (element,index) => {
        if(gameBoard[index]==""){
        gameBoard[index] = activePlayer.sign;
        element.innerHTML=activePlayer.sign;
        }
    };
    const boardNewRound=()=> {
        gameBoard=["", "", "","","","", "","", ""];
        querySelectorAll('.board_field').forEach(element => {
            element.style.backgroundColor = black;
            element.innerHTML = "";
        });
    }
    const boardStyleHover = (element, index) => {
        if(gameBoard[index]==""){
        element.innerHTML=activePlayer.sign;
        element.style.border = `solid 1px ${activePlayer.color}`;
        element.style.color=black;
        element.style.webkitTextStrokeColor=activePlayer.color;
        }
    };
    const boardStyleNotHover = (element, index) => {
        if(gameBoard[index]==""){
        element.style.border = `solid 1px #A4C2A8`;
        element.innerHTML="";
        }
    };
    const boardStyleClicked = (element, index) => {
        if (gameBoard[index] == "") {
        players.insertMove(index);
        insertMove(element,index);
        element.style.border = `solid 1px #A4C2A8`;
        element.style.color=activePlayer.color;
        }
    };
    const boardStyleWon = (index) => {
        querySelectorAll('.board_field')[index].style.backgroundColor = activePlayer.color;
        querySelectorAll('.board_field')[index].style.color = black;
        querySelectorAll('.board_field')[index].style.webkitTextStrokeColor=black;   
    };

    return {gameBoard, boardNewRound, insertMove, 
        boardStyleHover, boardStyleNotHover, boardStyleClicked, boardStyleWon 
    }
})();
let tie=0
const game =(()=>{
    
    const resetTie= () =>{
        tie=0
    }       
    const changeScoreDisplayer= () =>{
        querySelector ('.score-displayer-tie').innerHTML=tie;
        querySelector ('.score-displayer-X').innerHTML=players.playerX.score;
        querySelector ('.score-displayer-O').innerHTML=players.playerO.score;
    }
    const announceFinalwinner= () =>{
        querySelector('.game_section').style.filter="blur(4px)";
        querySelector('.result_section').style.display="flex";
        querySelector('.winner').innerHTML=`${activePlayer.sign} is a winner`;
    }

    return {  resetTie,changeScoreDisplayer, announceFinalwinner }
})();

let activePlayer=players.playerX;

const gameController = (() => {
    let roundOver = false;
    let gameOver = false;
    let winnerFound = false;
    let clickEnabled = Array.from({ length: 9 }, () => true);
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const showActivePlayerSign = () => {
        querySelector('.turn').innerHTML = `Turn ${activePlayer.sign}`;
        if (roundOver == true) {
            game.changeScoreDisplayer();
            if (winnerFound == true) {
                querySelector('.turn').innerHTML = `${activePlayer.sign} won`;
            } else {
                querySelector('.turn').innerHTML = `It is a tie`;
            }
        }
    }
    showActivePlayerSign();  

    const switchPlayerTurn = () => {
        return activePlayer = activePlayer === players.playerX ? players.playerO : players.playerX;
    };
    
    function checkRoundwinner() {
        const isSubset = (array1, array2) =>
            array2.every((element) => array1.includes(element));
        for (let i = 0; i < winningCombinations.length; i++) {
            if (isSubset(activePlayer.position, winningCombinations[i])) {
                returnWinner(i);
                roundOver = true;
                winnerFound = true;
                break; // Exit the loop when a winning combination is found
            }
        }
        if (gameBoard.indexOf("") === -1) {
            returnTie();
            roundOver = true;
            winnerFound = false;
        }
        if(roundOver){
            startNewRound();
        }
    }

    function startNewRound(){
        setTimeout(() => {
           players.resetPlayersPosition();
           players.resetPlayersWin(); 
           board.boardNewRound();
           activePlayer=players.playerX;
           roundOver = false;
           winnerFound = false;
           showActivePlayerSign();
           clickEnabled = Array.from({ length: 9 }, () => true);
        },500)
    }

    function startNewGame(){
        players.resetPlayersScore();
        game.changeScoreDisplayer();
        game.resetTie();
        players.resetPlayersPosition();
        players.resetPlayersWin(); 
        board.boardNewRound();
        activePlayer=players.playerX;
        roundOver = false;
        winnerFound = false;
        showActivePlayerSign();
        clickEnabled = Array.from({ length: 9 }, () => true);
    }

    function returnWinner(index) {
        const combo = winningCombinations[index];
        for (const positionIndex of combo) {
            board.boardStyleWon(positionIndex);
        }
        players.giveScore();
        game.changeScoreDisplayer();
    }

    function returnTie() {
        tie++;
    }
    function finishGame(){
        if(activePlayer.score==3){
            gameOver=true;
            game.announceFinalwinner();
            startNewGame();
        }
    }
    
    querySelectorAll('.board_field').forEach((element, index) => {
        element.addEventListener('mousemove', () => {
            board.boardStyleHover(element, index);
        });
        element.addEventListener('mouseleave', () => {
            board.boardStyleNotHover(element, index);
        });
        element.addEventListener('click', () => {
            if(
                // !isAiMode && 
                clickEnabled[index]){
                clickEnabled[index] = false;
                board.boardStyleClicked(element, index);
                checkRoundwinner();
                if(!roundOver){switchPlayerTurn()};
                showActivePlayerSign();  
                finishGame();
            }
            
        });
       
    });

    querySelector('.play').addEventListener('click', () => {
        startNewGame();
        querySelector('.game_section').style.filter="blur(0px)";
        querySelector('.result_section').style.display="none";
 
    });


return{startNewGame}
})();
