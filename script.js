var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class Player1{
    constructor(){
        this.x = 25;
        this.y = 300;
        this.width = 60;
        this.height = 80;
        this.image1 = new Image();
        this.image1.src = "./marco-imagenes/marcoBase4.png";
        this.image2 = new Image();
        this.image2.src = "./marco-imagenes/marcoBase5.png";
        this.image = this.image1;
    }
    collision(item){
        return (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
    }

    draw(){
        if(this.y < 300) this.y += 4;
        if(frames % 10 === 0) this.image = this.image === this.image1 ? this.image2 : this.image1;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}


class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = "./marioCanvas.png"; //FONDO CANVAS
        this.imageGameOver = new Image();
        this.imageGameOver.src ="./extras/game-over.png";
    }

    gameOver(){
        clearInterval(interval);

        ctx.drawImage(this.imageGameOver, 334, 105, 350, 200);  //new Image(); //
        //ctx.fillText("GameOver", 350, 200);  //image.src = "./extras/game-over.png";
    }
    draw(){
        this.x--;
        if(this.x < -canvas.width) this.x = 0;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

class Enemy{
    constructor(){
        this.x = canvas.width;
        this.y = 315;
        this.width = 55;
        this.height = 65;
        this.image1 = new Image();
        this.image1.src = "./enemies/trump-enemy1.png";
        this.image2 = new Image();
        this.image2.src = "./enemies/trump-enemy2.png";  // COPY PASTE
        this.image = this.image1;                          // COPY PASTE
    }
    draw() {
         if(frames %10 === 0) this.x -= 15;
       /* COPY PASTE*/ if(frames % 10 === 0) this.image = this.image === this.image1 ? this.image2 : this.image1;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}

var distancia = 85
var isFiring = false
var bulletTimer
var startFire = (isFire) => {
    
    if (!isFire) {
        
        isFiring = false
        distancia = 85
        return clearInterval(bulletTimer)
    }
    
    isFiring = true
    bulletTimer = setInterval(() => {
        distancia += 5
    }, 1000/60)
}

class Bullet{
    constructor(){
        this.x = mario.width;
        this.y = mario.y; 
        this.width = 55;
        this.height = 65;
        this.image = new Image();
        this.disparda= false
        this.image.src = "./extras/bullet.png";
    }
    draw() {
            ctx.drawImage(this.image, distancia, this.y, this.width, this.height)
    
      
    }
    collision(item){
        return (distancia < item.x + item.width) &&
            (distancia + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
    }
    fire() {

        startFire(true)
    }
    reload () {
        isReloaded = true
        this.disparda=false
        console.log("recar", this.disparda)
        // ctx.drawImage(this.image, distancia, this.y, this.width, this.height)
    }
}

var mario = new Player1();
var fondo = new Background();
var enemy = new Enemy();
var bullet = new Bullet();
// setInterval(() => {
//     newBullet = mario.recargar();
//     if (newBullet) {
//         newBullet.draw();
//     }
// }, 1000/60);

/* mario.image.onload = function(){
    mario.draw();
} */

var frames = 0;
var isReloaded = false
var nextBullet = new Bullet();
var interval = setInterval(function(){
    frames++;
    ctx.clearRect(0, 0, 1150, 600);
    fondo.draw();
    mario.draw();
    enemy.draw();
    generateEnemies();
    drawEnemies();
    if (isReloaded && nextBullet.disparda) {
        nextBullet.draw()
    }
    if(bullet.disparda){
        bullet.draw();
    }
    
}, 1000/60);

addEventListener("keydown", function(e){
    if(e.keyCode === 32){
        mario.y -= 85;
        

    }
})

addEventListener("keydown", e => {
    if (e.keyCode === 68) {
        if (!isFiring) {
            bullet.fire()
            bullet.disparda=true;
            
        console.log("dispare",bullet.disparda)
        }
    }
})

addEventListener("keydown", e => {
    if (e.keyCode === 82) {
        bullet.reload()
    
        startFire(false)
    }
}) 


var enemies = [];
function generateEnemies(){
    if(frames % 500 === 0 || frames % 800 === 0 || frames % 1000 === 0){
        let enemy = new Enemy();
        enemies.push(enemy);
        //¿? 
    }
}

function drawEnemies(){
    enemies.forEach(function(enemy){
        enemy.draw();
        if(mario.collision(enemy)){
            fondo.gameOver();
        }
        if (bullet.collision(enemy)) {
            enemy.width = 0
            enemy.height = 0
            enemy.x = 0
            enemy.y = 0
            nextBullet.disparda=false
            bullet.disparda=false
            // distancia = 0
            // bullet.reload()
            //startFire(false)
        }
    })
}
// y ahora?
