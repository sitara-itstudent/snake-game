const board = document.querySelector(".board");
const btn = document.querySelector(".btn");
const modal = document.querySelector(".modal");
const gameover = document.querySelector(".game-over");
const startgame = document.querySelector(".start-game");
const restartbtn = document.querySelector(".btn2");
const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");
const blockHeight = 50
const blockwidth= 50

const cols = Math.floor(board.clientWidth/blockHeight);
const rows = Math.floor(board.clientHeight/blockHeight);

const blocks = [] ;
let time = `00-00`;
let score = 0;
let highscore = localStorage.getItem("highscore") ||0;

highScoreElement.innerText = highscore;


let snake = [{
    x:1,y:3
 }
];
let direction = 'down';


let intervalId = null;
let timeintervalId = null

let food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}

for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
        const block = document.createElement("div");
        block.classList.add("block")
        board.appendChild(block);
        
        
        blocks[`${row}-${col}`] = block  /*Yahan hum bol rahe hain: "blocks naam ke container mein, jagah "2-3" pe — usi div ko rakho jo block variable ke andar hai."*/

    }  
}

// ← NAYA: helper function — poore board se fill/food class hatata hai
function resetBoard(){
    for(let row = 0; row < rows; row++){
        for(let col = 0; col < cols; col++){
            blocks[`${row}-${col}`].classList.remove("fill");
            blocks[`${row}-${col}`].classList.remove("food");
        }
    }
}



function render(){
    let head = null;
    blocks[`${food.x}-${food.y}`].classList.add("food")   // ← Food→food fix, space hataya

    if(direction == "left"){
        head ={x: snake[0].x , y: snake[0].y-1}  /*Naya head position calculate karo (direction ke hisaab se)*/
    }
    else if (direction == "right"){
        head ={x: snake[0].x , y: snake[0].y+1}
    }
    else if  (direction == "down"){
        head ={x: snake[0].x+1 , y: snake[0].y}
    }
    else if (direction == "up"){
        head ={x: snake[0].x-1 , y: snake[0].y}
    }

    if(head.x < 0 || head.x >= rows|| head.y < 0 ||head.y >= cols){
        clearInterval(intervalId)
        modal.style.display = "flex";/*ye kyu use ho rha h*/
        startgame.style.display = "none";
        gameover.style.display="flex";

        return;/*ye return kyu use kr rhe h*/
        
    }
     //food consume logic
    if(head.x == food.x && head.y == food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food")
       food ={ 
        x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols) /*recalculate kr rhe food ka coordinate*/
       }

         blocks[`${food.x}-${food.y}`].classList.add("food")
         snake.unshift(head)
         score += 10;
         scoreElement.innerText = score;

         if(score > highscore){
            highscore = score;
            localStorage.setItem("highscore",highscore.toString())
         }
     
    }

    snake.forEach(segment =>{
       blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    })

    snake.unshift(head)
    snake.pop()
    snake.forEach(segment =>{
       blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    });
}


btn.addEventListener("click",()=>{
    modal.style.display = "none";
    intervalId = setInterval(()=>{render()},400)

    timeintervalId = setInterval(() => {
        let [min,sec] = time.split("-").map(Number)//isko dekhna hain destructure property

        if(sec == 50){
            min +=1;
            sec = 0;
        }else{
            sec +=1;
        }

        time = `${min}-${sec}`;
        timeElement.innerText = time;
        
        
    },1000);
});


restartbtn.addEventListener("click",Gamestart)






function Gamestart(){

    clearInterval(intervalId);   // ← NAYA: purana interval bhi clear kiya (safety ke liye)
    resetBoard();                // ← NAYA: purani snake/food trail hatayi
    direction = 'down'; // ← NAYA: direction bhi reset kiya, taaki purana direction carry na ho
             
    score = 0
    time = `00-00`

    scoreElement.innerText = score;
    timeElement.innerText = time;
    highScoreElement.innerText = highscore;

    modal.style.display ="none";
    snake = [{ x:1,y:3}]
    food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
    intervalId = setInterval(()=>{render()},400)
}


addEventListener("keydown",(event) =>{
     if (event.key == "ArrowUp"){
        direction = "up"
     }
     else if (event.key =="ArrowRight"){
        direction = "right"
     }
     else if (event.key == "ArrowLeft"){
        direction = "left"
     }
     else if (event.key == "ArrowDown"){
        direction = "down"
     } 
})



















