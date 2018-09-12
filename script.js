var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//ya está
//pudiste verlo en accion?

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
    }

    gameOver(){
        clearInterval(interval);

        ctx.font = "80px Avenir";
        ctx.fillText("GameOver", 350, 200);
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
        this.image2.src = "./enemies/trump-enemy2.png";
        this.image = this.image1;
    }
    draw(){
         if(frames %10 === 0) this.x -= 15;
        if(frames % 10 === 0) this.image = this.image === this.image1 ? this.image2 : this.image1;
        ctx.drawImage(this.image1, this.x, this.y, this.width, this.height)
    }
}

var mario = new Player1();
var fondo = new Background();
var enemy = new Enemy();

/* mario.image.onload = function(){
    mario.draw();
} */

var frames = 0;
var interval = setInterval(function(){
    frames++;
    ctx.clearRect(0, 0, 1150, 600);
    fondo.draw();
    mario.draw();
    // enemy.draw();
    generateEnemies();
    drawEnemies();
}, 1000/60);

addEventListener("keydown", function(e){
    if(e.keyCode === 32){
        mario.y -= 80;
    }
})

var enemies = [];
function generateEnemies(){
    if(frames %100 === 0 || frames %70 === 0 || frames %170 === 0){
        let enemy = new Enemy();
        enemies.push(enemy);
    }
}

function drawEnemies(){
    enemies.forEach(function(enemy){
        enemy.draw();
        if(mario.collision(enemy)){
            fondo.gameOver();
        }
    })
}
