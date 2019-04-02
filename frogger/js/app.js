
window.playerPosX = 0;
window.playerPosY = 0;
window.isPlayerHit = false;

/*
* @description Enemy object
* @constructor
* @param {int} y - starting y-axis position
* @param {int} speed - enemy speed 
*/
var Enemy = function(y,speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.size = {top: 15, bottom: 15, left: 70, right: 70};

    this.startX = -150;
    this.x = this.startX;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   if (this.x > window.ctx.canvas.width){
        this.x = this.startX;
   }else{
        this.x = (this.x + this.speed*dt);
   }

   detectCollision(this);
};

/*
* @description Using enemy location and size to determine if collision with player's position
* @param {object} enemy
*/
function detectCollision(enemy){
    const enemyHeight = {topHeight: enemy.y - enemy.size.top, lowHeight: enemy.y + enemy.size.bottom};
    const enemyWidth = {leftWidth: enemy.x - enemy.size.left, rightWidth: enemy.x + enemy.size.right};

   if ((window.playerPosY >= enemyHeight.topHeight && window.playerPosY <= enemyHeight.lowHeight) && 
            (window.playerPosX >= enemyWidth.leftWidth && window.playerPosX <= enemyWidth.rightWidth))
   {
        window.playerPosX = 0;
        window.playerPosY = 0;
        window.isPlayerHit = true;
   }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
* @description Player object
* @constructor
*/
var Player = function(){

    this.sprite = 'images/char-boy.png';
    this.size = {top: 15, bottom: 15, left: 40, right: 40};

    this.startX = 200;
    this.startY = 380;
    this.x = this.startX; 
    this.y = this.startY;

    this.moveY = 80;
    this.moveX = 100;
}

Player.prototype.update = function() {

    if (isPlayerHit){
        this.x = this.startX;
        this.y = this.startY;
        window.isPlayerHit = false;
    }
    detectEdge(this); 
    detectWin(this);
}

/*
* @description adjust the player's object position using canvas edge
* @param {object} player
*/
function detectEdge(player){
    const  canvasEdgeWidth = window.ctx.canvas.width - (player.size.left + player.size.right);
    if (player.x >  canvasEdgeWidth){
            player.x -= player.moveX;
    }else if (player.x < 0){
            player.x = 0;
    }

    const canvasEdgeHeight = window.ctx.canvas.height - ((player.size.top + player.size.bottom)*5);
    if (player.y > canvasEdgeHeight){
        player.y -= player.moveY;
    }   
}


/*
* @description determine whether player has crossed finishing line
* @param {object} player
*/ 
function detectWin(player){
    const winLine = 60;

    if (player.y < winLine){
        player.x = player.startX;
        player.y = player.startY;
    }
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
};


Player.prototype.handleInput = function(key){

    switch(key){
        case 'up': this.y-= this.moveY;
                    break;
        case 'down': this.y+= this.moveY;
                    break;
        case 'left': this.x-= this.moveX;
                    break;
        case 'right': this.x+= this.moveX;
                    break;
    }

    window.playerPosX = this.x;
    window.playerPosY = this.y;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

let enemy1 = new Enemy(145,50);
let enemy2 = new Enemy(225,150);
let enemy3 = new Enemy(55,100);
let enemy4 = new Enemy(145,200);

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);

let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

