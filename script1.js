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
        this.image.src = "./plataformas/map-fondo.png"; //FONDO CANVAS
        this.imageGameOver = new Image();
        this.imageGameOver.src ="./extras/game-over.png";
        this.imageWin = new Image();
        this.imageWin.src ="./extras/win.png";
    }

    gameOver(){
        clearInterval(interval);

        ctx.drawImage(this.imageGameOver, 334, 105, 350, 200);  //new Image(); //
        //ctx.fillText("GameOver", 350, 200);  //image.src = "./extras/game-over.png";
    }
    win(){
        clearInterval(interval);
        ctx.drawImage(this.imageWin, 334, 105, 350, 200);
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
    collision(item) {
        return (
          this.x < item.x + item.width &&
          this.x + this.width > item.x &&
          this.y < item.y + item.height &&
          this.y + this.height > item.y
        );
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
    }else{
        isFiring = true
        bulletTimer = setInterval(() => {
            distancia += 5
        }, 1000/60)
    }
    
   
}

class Bullet{
    constructor(){
        this.x = mario.width + 20;
        this.y = 304; 
        this.width = 55;
        this.height = 65;
        this.image = new Image();
        this.disparda= false
        this.image.src = "./extras/bullet.png";
    }
    draw() {
        let pixels = 55;
        if (frames % 10 == 0) {
          
              this.x += pixels;
          }
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    
      
    }
}

var mario = new Player1();
var fondo = new Background();
var enemy = new Enemy();
var bullet = new Bullet();
var frames = 0;
var isReloaded = false

var interval = setInterval(function(){
    frames++;
    ctx.clearRect(0, 0, 1150, 600);
    fondo.draw();
    mario.draw();
    generateEnemies();
    drawEnemies();
    drawBullets()
    ponit()

}, 1000/60);

addEventListener("keydown", function(e){
    if(e.keyCode === 32){
        mario.y -= 85;

    }
    if (e.keyCode === 68) {
        generateBullets()

    }
    if (e.keyCode === 82) {
        bullet.reload()
    
    }
})




var enemies = [];
function generateEnemies(){
    if(frames % 500 === 0 || frames % 800 === 0 || frames % 1000 === 0){
        var enemy = new Enemy;
        enemies.push(enemy);
    }
}

var mate = 0;
function drawEnemies(){
    enemies.forEach(function(enemy){
        enemy.draw();
        if(mario.collision(enemy)){
            fondo.gameOver();
        }
        balitas.forEach(function(bala, indexShot) {
            if (enemy.collision(bala)) {
                mate = mate +1;
                enemy.width = 0
            enemy.height = 0
            enemy.x = 0
            enemy.y = 0

              balitas.splice(indexShot, 1);
            }
        })

    })
}

var balitas =[]
function generateBullets(){
    
        var bullet = new Bullet;
        balitas.push(bullet);

}


function drawBullets(){
    balitas.forEach(function(balita, index){
        balita.draw()
        if (
            balita.x > canvas.width ||
            balita.x < canvas.x ||
            balita.y > canvas.height ||
            balita.x < canvas.y
          ) {
            balitas.splice(index, 1);
          }
    })
}

function ponit (){
    ctx.font= "50px Avenir";
    ctx.fillText(mate,130,40)
    if(mate >= 10){
        fondo.win();
    }
}