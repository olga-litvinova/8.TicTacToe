
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

const start=document.querySelector('.buttom');
function startGame(){
    const menu_section=document.querySelector('.menu');
    const game_section=document.querySelector('.game');
    const turn=document.querySelector('.turn');
    menu_section.style.display = "none";
    game_section.style.display ="grid"
    if(playerSign=="O"){turn.innerHTML="Turn: O";}
    else if(playerSign=="X") {turn.innerHTML="Turn: X";}
}
start.addEventListener('click', startGame);



// function GameController(PlayerX="Player X",PlayerO="Player O"){
    let players= [
        {
            name:"PlayerX",
            sign: "X",
            score:0,
            position:[
                "", "", "",
                "","","", 
                "","", ""]
        },
        {
            name: "PlayerO",
            sign: "O",
            score: 0,
            position:[
                "", "", "",
                "","","", 
                "","", ""]   
        }
    ];

    let activePlayer=players[0];

    const board=document.querySelectorAll('.board_field');
    var board_array = [...board];
    let area = [
        "", "", "",
        "","","", 
        "","", ""
    ];

    board_array.forEach((div,index) => {
        div.addEventListener('mousemove', () =>{
            if (area[index] == "") {
                div.innerHTML=activePlayer.sign;
            }
        });
        div.addEventListener('mouseleave', () =>{
            if (area[index] == "") {
                div.innerHTML='';
            }
        });
        div.addEventListener('click', () =>{
            if (area[index] == "") {
                div.innerHTML=activePlayer.sign;
                getActivePlayer();
                activePlayer.position[index]=activePlayer.sign;
                area[index] = activePlayer.sign;
                switchPlayerTurn();
            }
        });
    });
   

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    
    
    const checkWinner= () => {
        area.forEach((index) => {

        }
    )};

// }

// GameController()


//Game



// 012
// 345
// 678
// 036
// 147
// 258
// 048
// 246




