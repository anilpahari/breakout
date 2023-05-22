
const grid = document.querySelector(".grid");
let displayScore=document.getElementById("score");
let blockHeight=12;
let blockWidth=80;
let boderWidth=530;
let borderHidth =300;
let ballDiameter=15;
let userStat= [206,12];
let cureenPosition = userStat;
let xDirection = -2;
let yDirection = 2;
let ballstart=[236,27];
let currentBallPosition=ballstart;


class Blocks{
    constructor(xAxis,yAxis){
        this.bottomLeft=[xAxis,yAxis];
        this.bottomRight=[xAxis,yAxis+blockWidth];
        this.topLeft=[xAxis,yAxis+blockHeight];
        this.topRight=[xAxis+blockWidth,yAxis+blockHeight];
        
    }
}
const blocks=[
    new Blocks(7,285),
    new Blocks(95,285),
    new Blocks(183,285),
    new Blocks(271,285),
    new Blocks(358,285),
    new Blocks(445,285),
    new Blocks(7,265),
    new Blocks(95,265),
    new Blocks(183,265),
    new Blocks(271,265),
    new Blocks(358,265),
    new Blocks(445,265),
    new Blocks(7,245),
    new Blocks(95,245),
    new Blocks(183,245),
    new Blocks(271,245),
    new Blocks(358,245),
    new Blocks(445,245),
    new Blocks(7,225),
    new Blocks(95,225),
    new Blocks(183,225),
    new Blocks(271,225),
    new Blocks(358,225),
    new Blocks(445,225),
    new Blocks(7,205),
    new Blocks(95,205),
    new Blocks(183,205),
    new Blocks(271,205),
    new Blocks(358,205),
    new Blocks(445,205)
    

   
]

function addBlocks(){

    for(let i=0;i<blocks.length;i++){
        const block =document.createElement("div");
        block.classList.add("block");
        block.style.left=blocks[i].bottomLeft[0]+'px';
        block.style.bottom=blocks[i].bottomLeft[1]+'px';
        grid.appendChild(block);

    };

};
addBlocks();


const user =document.createElement("div");
user.classList.add("user");
draw();
grid.appendChild(user);

function draw(){
    user.style.left=cureenPosition[0]+'px';
    user.style.bottom=cureenPosition[1]+'px';
}
//move user
function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
        if(cureenPosition[0]>0){
            cureenPosition[0] -=9;
            draw();
            }
            break;
        case 'ArrowRight':
            if(cureenPosition[0]<450){
                cureenPosition[0] +=9;
                draw();
            }
            break;
            
      
            
    }

}
document.addEventListener('keydown',moveUser);

//Crating a ball
function drawBall(){
    ball.style.left=currentBallPosition[0] +'px';
    ball.style.bottom=currentBallPosition[1]+'px';
};

const ball =document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

//moving a ball
function moveBall(){
    currentBallPosition[0]+=xDirection;
    currentBallPosition[1]+=yDirection;
    drawBall();
    checkForCollision();
};
let timerId=setInterval(moveBall,30);
//checking for the collision
//checking for the ball collision
for(i=0;i<blocks.length;i++){
    if(
        (currentBallPosition[0]>blocks[i].bottomLeft[0]&&currentBallPosition[0]<blocks[i].bottomRight)&&
        ((currentBallPosition[1]+ballDiameter>blocks[i].bottomLeft)&&currentBallPosition[1]<blocks[i].topLeft[1])
    ){
        const allBlocks =Array.from(document.querySelectorAll('.block'));
        allBlocks[i].classList.remove('block');
        blocks.splice(i,1);
        changeDirection();

    }
}


//checking for the wall collision
function checkForCollision(){
    if(currentBallPosition[0]>=boderWidth-ballDiameter|| currentBallPosition[1]>=borderHidth-ballDiameter||currentBallPosition[0]<=0){
        changeDirection();
    }
    if(currentBallPosition[1]<=0){
        clearInterval(timerId);
        displayScore.innerHTML="You lose";
        document.removeEventListener("keydown",moveUser);
    }
}
function changeDirection(){
    if (xDirection===2 && yDirection===2){
        yDirection=-2;
        return ;
    }
    if(xDirection===2 && yDirection===-2){
        xDirection=-2;
        return;
    }
    if(xDirection===-2 && yDirection===2){
        xDirection=2;
        return;
    }
    if(xDirection===-2 && yDirection===-2){
        yDirection=2;
        return;
    }
}