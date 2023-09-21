// Game starts with a menu section, where player can choose the sign(x or o) and the enemy(human or robot)
// following piece of code creates a Toggle Switch functianality(on/off button) both for defining the sign and enemy

const x=document.querySelector('.x');
const o=document.querySelector('.o');
const pickSign=document.querySelector('.pickSign');
const robot=document.querySelector('.robot');
const human=document.querySelector('.human');
const pickEnemy=document.querySelector('.pickEnemy');
let color1="#2A2B2E";
let color3="#87FF65";
let color4="#e4ff1a";
let color5= "#A4C2A8";
let isX = true; 
let isRobot=true;
let playerSign="X";
let enemySign="O";
let playerEnemy="Robot"

function createToggleFunction(element1,element2, color1, color2, labelText, toggleValue, variableToUpdate ){
    return function(){  
        toggleValue = !toggleValue;
        if(toggleValue){
            element1.style.backgroundColor = color2;
            element1.style.color = color1;
            element2.style.backgroundColor = color1;
            element2.style.color = color2;
            labelText.innerHTML = `Pick your ${variableToUpdate}: ${element1.textContent}`;
            if (variableToUpdate === 'sign') {
                playerSign = element1.textContent;
                enemySign = element2.textContent;
            } else if (variableToUpdate === 'enemy') {
                playerEnemy = element1.textContent;
            }
        }
        else {
            element1.style.backgroundColor=color1;
            element1.style.color=color2;
            element2.style.backgroundColor=color2;
            element2.style.color=color1;
            labelText.innerHTML = `Pick your ${variableToUpdate}: ${element2.textContent}`;
            if (variableToUpdate === 'sign') {
                playerSign = element2.textContent;
                enemySign = element1.textContent;
            } else if (variableToUpdate === 'enemy') {
                playerEnemy = element2.textContent;
            }
        }
        return toggleValue;
    };
}

const toggleSign = createToggleFunction(x, o, color1, color3, pickSign, isX, 'sign');
const toggleEnemy = createToggleFunction(robot, human, color1, color3, pickEnemy, isRobot, 'enemy');
x.addEventListener('click', toggleSign);
o.addEventListener('click', toggleSign);
robot.addEventListener('click', toggleEnemy);
human.addEventListener('click', toggleEnemy);

// After defining the sign and enemy, we are ready to start our game :)
// With a click of a start button our board game shows off.
// Technically one section "menu" displayes as none and next section "game" turns on 

const menu_section=document.querySelector('.menu');
const game_section=document.querySelector('.game');
const start=document.querySelector('.buttom');
const turn=document.querySelector('.turn');
const result=document.querySelector('.result');
const winner=document.querySelector('.winner');
const scoreX=document.querySelector ('.score-displayer-X')
const scoreO=document.querySelector ('.score-displayer-O')
const scoreTie=document.querySelector ('.score-displayer-tie')
const menu=document.querySelectorAll('.return');
const play=document.querySelector('.play');


function startGame(){
    menu_section.style.display = "none";
    game_section.style.display ="grid";
    reset();
    // turn.innerHTML="Turn: "+ players[0].sign;
    // if(playerSign=="O"){turn.innerHTML="Turn: X";}
    // else if(playerSign=="X") {turn.innerHTML="Turn: X";}
}
start.addEventListener('click', startGame);

menu.forEach(menu => {
    menu.addEventListener('click', () =>{
        menu_section.style.display = "grid";
        game_section.style.display ="none";
        result.style.display="none";
        game_section.style.filter="blur(0px)";
        reset();
    })
  });

play.addEventListener('click', () =>{
    result.style.display="none";
    game_section.style.filter="blur(0px)";
    reset();
})

let players= [
    {
        name:"Player X",
        sign: "X",
        score: 0,
        position:[],
        winner: false,
        color: color4,
        round:1   
    },
    {
        name: "Player O",
        sign: "O",
        score: 0,
        position:[],
        winner: false,
        color: color3,
        round:1      
    }
];

let activePlayer=players[0];
let tie=0;

const board=document.querySelectorAll('.board_field');
var board_array = [...board];
let area = [
    "", "", "",
    "","","", 
    "","", ""
];

board_array.forEach((div,index) => {
    div.addEventListener('mousemove', () =>{
        if (area[index] == "" && activePlayer.winner==false) {
            div.innerHTML=activePlayer.sign;
            div.style.color=color1;
            div.style.webkitTextStrokeColor=activePlayer.color;
            div.style.border = `solid 1px ${activePlayer.color}`;
            // -webkit-text-stroke-color=activePlayer.color;
        }
    });
    div.addEventListener('mouseleave', () =>{
        if (area[index] == "" && activePlayer.winner==false) {
            div.innerHTML='';
            div.style.border = `solid 1px ${color5}`;
        }
    });
    div.addEventListener('click', () =>{
        if (area[index] == "" && activePlayer.winner==false) {
            div.innerHTML=activePlayer.sign;
            div.style.color=activePlayer.color;
            div.style.border = `solid 1px ${color5}`;
            div.style.trans
            activePlayer.position.push(index);
            activePlayer.position.sort();
            area[index] = activePlayer.sign;  
            checkRoundwinner();
            announceFinalwinner();
            switchPlayerTurn();  
            turnSign();
        }
    });
});

const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
};


let combo=[];

function checkRoundwinner(){
    const winningCombinations = [
        [0, 1, 2], // 012
        [3, 4, 5], // 345
        [6, 7, 8], // 678
        [0, 3, 6], // 036
        [1, 4, 7], // 147
        [2, 5, 8], // 258
        [0, 4, 8], // 048
        [2, 4, 6]  // 246
    ];
    let isSubset = (array1, array2) =>
    array2.every((element) => array1.includes(element));

    let index=0;
    for (let i= 0; i < winningCombinations.length;i++) 
    {
        if(isSubset(activePlayer.position, winningCombinations[index])==false){
            index++;
        }
        else if (isSubset(activePlayer.position, winningCombinations[index])==true) {
            combo=winningCombinations[index];
            activePlayer.score++; 
            if(activePlayer.score==5){
                announceFinalwinner()
            }
            else{
                activePlayer=players[0];
                changeScore()
                resetBoard()
                switchPlayerTurn();  
            }
            return combo;   
        } 
        else if (isSubset(activePlayer.position, winningCombinations[index])==false && area.includes("")==false){
            tie++;
            changeScore();
            activePlayer=players[0];
            resetBoard();
            switchPlayerTurn(); 
        }
    } ;
};

function announceFinalwinner(){  
    if(activePlayer.score==3 ){
        for (const index of combo) {
            board_array[index].style.backgroundColor = activePlayer.color;
            board_array[index].style.color = color1;
        }               
        game_section.style.filter="blur(4px)";
        result.style.display="flex";

        if(activePlayer.sign==playerSign){
            winner.innerHTML="You are a winner";
            activePlayer.score++;
        }
        else if(activePlayer.sign !== playerSign){
            winner.innerHTML="You lost";
            activePlayer.score++;
        }
    }
}
    
function turnSign(){
    turn.innerHTML='Turn: '+ activePlayer.sign;
}

function changeScore(){
    scoreTie.innerHTML=tie;
    scoreX.innerHTML=players[0].score;
    scoreO.innerHTML=players[1].score;
}
changeScore()
    
function reset(){
    board_array.forEach((div, index) => {
        div.innerHTML = ''; 
        board_array[index].style.backgroundColor =color1;
        });

    area = [
        "", "", "",
        "","","", 
        "","", ""
    ];

    players.forEach((player) => {
        player.position = [];
        player.winner = false;
        player.score = 0;
        });
    
    activePlayer=players[0];
    turnSign();
    changeScore();
}


function resetBoard(){
    activePlayer=players[0];
    board_array.forEach((div, index) => {
        div.innerHTML = ''; 
        board_array[index].style.backgroundColor =color1;
        });

    area = [
        "", "", "",
        "","","", 
        "","", ""
    ];
    players.forEach((player) => {
        player.position = [];
    });
    activePlayer=players[0];
}








