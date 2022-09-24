let canvas = document.querySelector("#canvas");
canvas.height = 700;
canvas.width = 900;
let canvas_position = canvas.getBoundingClientRect().left;

let ctx = canvas.getContext("2d");

function player_paddle(){
    this.x = 350;
    this.y = 680;
    this.width = 200;
    this.height = 20;
}

let mouse_x = null;

let player = new player_paddle();


function draw_player_paddle(){
    ctx.fillStyle = "white";
    ctx.fillRect(player.x,player.y,player.width,player.height);
}


document.body.addEventListener("mousemove",function(e){
    mouse_x = e.x - canvas_position;
})

function update_player_paddle(){
    if(player.x != mouse_x){
        let dx = player.x - mouse_x;
        player.x -= dx/20;
    }

    if(player.x <0){
        player.x = 0;
    }else if(player.x + player.width > 900){
        player.x = 900  - player.width;
    }
}

function loop(){
    ctx.clearRect(0,0,900,700);
    draw_player_paddle();
    update_player_paddle();
    requestAnimationFrame(loop);
}

loop();

