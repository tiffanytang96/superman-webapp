// Flappy Superman v.1.0.0
// Tiffany Tang

const cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var scoreNum = document.getElementById('score');
var highScoreNum = document.getElementById('highscore');
var startButton = document.getElementById('startAnimation');
var stopButton = document.getElementById('stopAnimation');

// Images ------------------------------------------
var superMan = new Image();
var bg = new Image();
var fg = new Image();
var nTower = new Image();
var sTower = new Image();

superMan.src = "images/superman.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
nTower.src = "images/ntower.png";
sTower.src = "images/stower.png";


// Audio ------------------------------------------
var fly = new Audio();
var point = new Audio();
var splat = new Audio();

fly.src = "media/whoosh.mp3";
point.src = "media/score.mp3";
splat.src = "media/splat.mp3";

// Variables --------------------------------------
// Gap inbetween the towers
var gap = 80;
//This takes the height of the north tower and gap and set the position of the south tower
//console.log(nTower.height);
var constant = 242+gap;

// Superman's starting coordinates
var sX = 10;
var sY = 150;
// Speed
var speed = 0;
// Tower starting coordinates
var towerX = 150;
var towerY = 0;
// Default 0
var zero = 0;

// moves superman down 
var gravity = 0.1;

//Highscore
let highscore = localStorage.getItem('highscore');

// function for superman to move up on keydown
var isKeyPressed = false;
function flyUp(){
    if(!isKeyPressed){
        isKeyPressed = true;
        speed = -2.5;
        fly.play();
        fly.playbackRate=7;
    }
}
function keyRelease(){
    isKeyPressed = false;
}

// tower cordinates
var tower = [];
tower[0] = {
    x:cvs.width,
    y:0
}

// score 
var score = 0;

// Start and Stop Buttons
stopButton.style.display = "none";

startButton.addEventListener('click', function() {
    this.style.display = "none";
    stopButton.style.display = "block";
    document.addEventListener('keydown', flyUp);
    document.addEventListener('keyup', keyRelease);
    start();
});

stopButton.addEventListener('click',function() {
    this.style.display = "none";
    startButton.style.display = "block";
    location.reload();
});

// Test if all game images have loaded before starting the game...
// Create the flag variables (counter and total of images)
var counter = 0;
var totalImages = 5;

// Create an instance of your images
var superMan = new Image();
var bg = new Image();
var fg = new Image();
var nTower = new Image();
var sTower = new Image();

// The onload callback is triggered everytime an image is loaded
var onloadCallback = function(){
    // Increment the counter
    counter++;

    // Verify if the counter is less than the number of images
    if(counter < totalImages){
        return;
    }

    // Trigger the final callback if is the last img
    allLoadedCallback();
};


// The callback that is executed when all the images have been loaded
var allLoadedCallback = function(){
    // Start Game here
    // Displays elements in the canvas as static elements
    draw();
    
    // Display score
    scoreNum.textContent = `Score: ${score}`;
 
    // Storing highscore
    if(highscore == null || highscore == undefined){
        highscore = 0;
        highScoreNum.innerHTML = `Highscore: ${highscore}`;
    }else {
        highScoreNum.innerHTML = `Highscore: ${highscore}`;
    }
};

// Attach onload callbacks
superMan.onload = onloadCallback;
fg.onload = onloadCallback;
bg.onload = onloadCallback;
nTower.onload = onloadCallback;
sTower.onload = onloadCallback;

// Load the images !
superMan.src = "images/superman.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
nTower.src = "images/ntower.png";
sTower.src = "images/stower.png";



// Function ------------------------------------------
 
$(document).ready(function(){  
    // Displays elements in the canvas as static elements
    // draw();
    
    // // Display score
    // scoreNum.textContent = `Score: ${score}`;

    // // Storing highscore
    // if(highscore == null || highscore == undefined){
    //     highscore = 0;
    //     highScoreNum.innerHTML = `Highscore: ${highscore}`;
    // }else {
    //     highScoreNum.innerHTML = `Highscore: ${highscore}`;
    // }
});

// Static start screen
function draw(){
    console.log('Hello from draw!!!')
    ctx.drawImage(nTower, towerX, towerY);
    ctx.drawImage(sTower, towerX, towerY + constant);
    console.log(bg);
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(fg, zero, cvs.height - fg.height);
    ctx.drawImage(superMan, sX, sY);
    //requestAnimationFrame(draw);
}

// Start function once start button is clicked
function start(){
    ctx.drawImage(bg, 0, 0);

     // Superman velocity
     speed += gravity;
     sY += speed;
 
     ctx.drawImage(superMan, sX, sY);

    for(let i = 0; i < tower.length; i++){
        ctx.drawImage(nTower, tower[i].x, tower[i].y);
        ctx.drawImage(sTower, tower[i].x, tower[i].y + constant);

        tower[i].x--;

        if(tower[i].x == 90){
            tower.push({
                x:cvs.width,
                y:Math.floor(Math.random() * nTower.height) - nTower.height
            });
        }

        // Collison with towers and fg
        if(sX + superMan.width >= tower[i].x && sX <= tower[i].x + nTower.width && (sY <= tower[i].y + nTower.height || sY+superMan.height >= tower[i].y+constant) || sY + superMan.height >= cvs.height - fg.height){

            speed = 0;
            gravity = 0;
            splat.play();
            ctx.drawImage(fg, 0, cvs.height - fg.height);
            cancelAnimationFrame(rafID);
            if (score > highscore) {
                highscore = score;
                localStorage.setItem('highscore', score);
              }
        }

        if(tower[i].x == 5){
            point.play();
            // Increase score by 1 each time superman passes a tower
            score++;
            scoreNum.textContent = `Score: ${score}`;
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
        
    const rafID = requestAnimationFrame(start);
    
}
