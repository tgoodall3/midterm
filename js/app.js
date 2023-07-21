var ship;
var aliens = [];
// var bullets = [];
var bullets = [];

function setup(){
    createCanvas(600,400);
    ship = new Ship();
    // bullet = new Bullet(width/2, height/2);
    for (var i = 0; i < 5; i++)
    aliens[i] = new alien(i *100+100,30);
}

function draw(){
    background(51);
    ship.show();
    // bullet.show();
    // bullet.move();
    for (var i = 0; i < bullets.length; i++){
        bullets[i].show();
        bullets[i].move();

        for (var j = 0; j < aliens.length; j++){
            if (bullets[i].hits(aliens [j])){
                aliens[i].shrink();
                bullets[i].remove();
                console.log('hit');
            }

        }
        }

    var edge = false;
    for (var i = 0; i < aliens.length; i++){
    aliens[i].show();
    aliens[i].move();
    if (aliens[i].x > width || aliens[i].x < 0){
        edge=true;
    }
}
    if (edge){
        for (var i = 0; i < aliens.length; i++){
            aliens[i].shiftDown();
    }
    }
}

function keyPressed(){
    if (key === ' '){
        var bullet = new Bullet(ship.x, height);
        bullets.push(bullet);
    }


    if (keyCode === RIGHT_ARROW){
        ship.move(1);
    } else if (keyCode === LEFT_ARROW)
    {
        ship.move(-1);
    }
}

function alien(x, y){
    this.x = x;
    this.y = y;
    this.r = 30;
    this.xdir=1;

    this.shrink = function(){
        this.r = this.r / 2;
    }

    this.shiftDown = function(){
        this.xdir *= -1;
        this.y += this.r;
    }

    this.show = function(){
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }

    this.move = function() {
        this.x = this.x + this.xdir;
    }
}



function Ship(){
    this.x = width/2;


    this.show = function(){

        rect(this.x, height-40,40,50);
    }

    this.move = function(dir) {
        this.x += dir*5; 
    }
} 

function Bullet (x,y) {
    this.x = x;
    this.y = y;
    this.r = 8;
    this.delete = false;



    this.show = function(){
        // fill(50,0,220);
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }

    this.move = function(){
        this.y = this.y - 3;
    }

    this.remove = function(){
        this.delete = true;
    }
    
    this.hits = function(alien){
        var d = dist(this.x, this.y, alien.x, alien.y);
        if (d < this.r + alien.r){
            return true;
        } else {
            return false;
        }
    }
}

