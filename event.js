const playerSign=function(){
    this.createPlayer=function(sign){
        
    }
}

// const playerSign = sign;
// let enemySign; 
// if (playerSign==="X"){
//     enemySign = "O";
// }
// else{
//     enemySign = "X";
// }



const menu_section=document.querySelector('.menu');
const game_section=document.querySelector('.game');
const turn=document.querySelector('.turn');
const x=document.querySelector('.x');
const o=document.querySelector('.o');
const pickSign=document.querySelector('.pickSign');
const robot=document.querySelector('.robot');
const human=document.querySelector('.human');
const pickEnemy=document.querySelector('.pickEnemy');
const board=document.querySelectorAll('.game-board__field');
var board_array = [...board];
const stateElement = document.querySelectorAll('.game-board__state');
var stateElement_array= [...stateElement]
// const currentState = stateElement.getAttribute('data-field-state');
const start=document.querySelector('.buttom');
let color1="#2A2B2E";
let color2="#222b30";
let color3="#87FF65";
let color4="#e4ff1a";
let color5="#A4C2A8";
let isX = true; 
let isRobot=true;
let sign="X"
let enemy="Robot"

x.addEventListener('click', switchBtn);
o.addEventListener('click', switchBtn);
robot.addEventListener('click', switchEnemy);
human.addEventListener('click', switchEnemy);
start.addEventListener('click', startGame);

function switchBtn(){
    isX = !isX;
    if (isX) {
        x.style.backgroundColor = color3;
        x.style.color = color1;
        pickSign.innerHTML="Pick your sign: X";
        o.style.backgroundColor = color1;
        o.style.color = color3;
        sign="X";
    } else {
        o.style.backgroundColor = color3;
        o.style.color = color1;
        pickSign.innerHTML="Pick your sign: O";
        x.style.backgroundColor = color1;
        x.style.color = color3;
        isX=false;
        sign="O";
    }
}




function switchEnemy(){
    isRobot = !isRobot;
    if (isRobot) {
        robot.style.backgroundColor = color3;
        robot.style.color = color1;
        pickEnemy.innerHTML="Pick your enemy: Robot";
        human.style.backgroundColor = color1;
        human.style.color = color3;
        enemy="Robot";
    } else {
        robot.style.backgroundColor = color1;
        robot.style.color = color3;
        pickEnemy.innerHTML="Pick your enemy: Human";
        human.style.backgroundColor = color3;
        human.style.color = color1;
        isRobot=false;
        enemy="Human";
    }
}

function startGame(){
    console.log(sign,enemy);
    menu_section.style.display = "none";
    game_section.style.display ="grid"
    if(playerSign=="O"){turn.innerHTML="Turn: O";}
    else if(playerSign=="X") {turn.innerHTML="Turn: X";}
}



// board.
// board.addEventListener('mousemove', () =>{
//     td.style.backgroundColor=black;
// })

// board_array.forEach((div) => {
//     div.addEventListener('mouseleave', () =>{
//             div.style.backgroundColor='red';
//         })
// });


board_array.forEach((div) => {
    // div.addEventListener('mousemove', () =>{
    //     if (stateElement_array == '') {
    //         div.innerHTML='X';
    //     }
    // });
    // div.addEventListener('mouseleave', () =>{
    //     if (stateElement_array == '') {
    //         div.innerHTML='';
    //     }
    // });
    div.addEventListener('click', () =>{
        if (stateElement_array == '') {
            div.innerHTML='X';
            stateElement_array.setAttribute('data-field-state', 'X');
            field.style.pointerEvents = 'none';
        }
    });
});