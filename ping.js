let canvas = document.querySelector("#canvas");
canvas.height = 700;
canvas.width = 900;
let canvas_position = canvas.getBoundingClientRect().left;


let ctx = canvas.getContext("2d");

let num = 0;

function player_paddle(){
    this.x = 350;
    this.y = 680;
    this.width = 200;
    this.height = 20;
}

function system_paddle(){
    this.x = 350;
    this.y = 0;
    this.width = 200;
    this.height = 20;
}


function create_ball(){
    this.x = 450;
    this.y = 30;
    this.angle = 45;
    this.speed = 8;
    this.xspeed = 5;
    this.yspeed = 5;
    this.radius = 10;
    this.start = (Math.PI/180)*0;
    this.stop = (Math.PI/180)*360;
    this.clock = false;
    this.style1 = "white";
}

let mouse_x = null;

let player = new player_paddle();
let ball = new create_ball();
let com = new system_paddle();

function draw_ball(){
    ctx.fillStyle = ball.style1;
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,ball.start,ball.stop,ball.clock);
    ctx.fill();
    ctx.closePath();
}

function change_ball_position(){
    let radian = (Math.PI/180)*ball.angle;
    add_x = Math.cos(radian)*ball.speed;
    add_y = Math.sin(radian)*ball.speed;
    add_up2()
}

// function add_up1(){
//     ball.x += ball.xspeed;
//     ball.y += ball.yspeed;
// }

function add_up2(){
    ball.x += add_x;
    ball.y += add_y;
}

 function check_ball_collision(){
     if((ball.y > 680) && (ball.x+ball.radius > player.x) && (ball.x-ball.radius < player.x + player.width)){
        // ball.yspeed = -ball.yspeed-5;
        // add_up();
        ball.angle = 360 - ball.angle;
        change_ball_position();

     }else if( ball.x > 900 || ball.x < 0 ){
        // ball.xspeed = - ball.xspeed-5;
        // add_up();
        ball.angle = 180 - ball.angle;
        change_ball_position();
     }else if((ball.y < 20) && (ball.x+ball.radius > com.x) && (ball.x-ball.radius < com.x + com.width)){
        // ball.yspeed = -ball.yspeed-5;
        // add_up();
        ball.angle = 360 - ball.angle;
        change_ball_position();

     }
     
 }


function draw_player_paddle(){
    ctx.fillStyle = "white";
    ctx.fillRect(player.x,player.y,player.width,player.height);
}

function draw_com_paddle(){
    ctx.fillStyle = "white";
    ctx.fillRect(com.x,com.y,com.width,com.height);
}

function update_ball_speed(){
        ball.speed++;
}

function upadte_com_paddle(){
    if(com.x != ball.x){
        let dx = com.x - ball.x;
        com.x -= dx/2;
    }

    if(com.x < 0){
        com.x = 0;
    }else if(com.x + com.width > 900){
        com.x = 900 - com.width;
    }
}

function game_over(){
    if(ball.y > 700){
        return "p";  
    }else if(ball.y <0){
        return "c";
    }
}




document.body.addEventListener("mousemove",function(e){
    mouse_x = e.x - canvas_position;
})

function update_player_paddle(){
    if(player.x != mouse_x){
        let dx = player.x - mouse_x;
        player.x -= dx/10 + 50;
    }

    if(player.x <0){
        player.x = 0;
    }else if(player.x + player.width > 900){
        player.x = 900  - player.width;
    }
}

function loop(){
    ctx.clearRect(0,0,900,700);
    draw_com_paddle();
    draw_player_paddle();
    update_player_paddle();
    draw_ball()
    change_ball_position();
    upadte_com_paddle();
    check_ball_collision();
    let end = game_over();

    if(end == 'p'){
        ctx.fillStyle = "white";
        ctx.font = "50px serif";
        ctx.fillText("GAMEOVER",300,350);
        return;
    }else if( end == "c"){
        ctx.fillStyle = "white";
        ctx.font = "50px serif";
        ctx.fillText("YOU WIN",300,350);
        return;
    }
    requestAnimationFrame(loop);
}

loop();


setInterval(update_ball_speed,3000);
