const board = document.querySelector(".board");
const blockHeight = 50
const blockwidth= 50

const cols = Math.floor(board.clientWidth/blockHeight);
const rows = Math.floor(board.clientHeight/blockHeight);

const blocks = [] ;

const snake = [{
    x:1,y:3
 }
];
let direction = 'down';


let intervalId = null;

let food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}

for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
        const block = document.createElement("div");
        block.classList.add("block")
        board.appendChild(block);
        
        block.innerText = `${row}-${col}`
        blocks[`${row}-${col}`] = block  /*Yahan hum bol rahe hain: "blocks naam ke container mein, jagah "2-3" pe — usi div ko rakho jo block variable ke andar hai."*/

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
        alert("game is over")
        clearInterval(intervalId)
        
    }

    if(head.x == food.x && head.y == food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food")
       food ={ 
        x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)
       }/*recalculate kr rhe food ka coordinate*/

         blocks[`${food.x}-${food.y}`].classList.add("food")
         snake.unshift(head)
     
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

intervalId = setInterval(() => {
    render();
}, 400);


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



















