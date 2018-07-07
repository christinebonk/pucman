//create the pacman

//create pacman controls through keyboard

//create the maze
var map = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
[1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
[1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
[1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
[1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

]


var drawMap = function() {
	for (i=0;i<map.length;i++) {
		//create row
		var newRow = $("<div class='row'>")
		for (e=0;e<map[0].length;e++) {
			var newDiv = $("<div class='tile'>")
			if (map[i][e] === 0) {
				newDiv.addClass("wall");
			} else if (map[i][e] === 1) {
				newDiv.addClass("space");
			}
			newRow.append(newDiv);
		}
		$("#map").append(newRow);
	}
}


var player = {
	xdir: 128,
	ydir: 128,
	y: 128,
	x: 128 
}



var pacman 

var generatePlayer = function(x,y) {
	var top = (y / 32 * 25) + "px";	
	var left = (x / 32 * 25) + "px";
	pacman = $("<div class='pacman'>").css({"top": top, "left": left});
	$("#map").append(pacman);
}

var generateGhost = function(x,y) {
	var top = (y / 32 * 25) + "px";	
	var left = (x / 32 * 25) + "px";
	ghost = $("<div class='ghost'>").css({"top": top, "left": left});
	$("#map").append(ghost);
}

function movePlayer(x,y) {
	var top = (y / 32 * 25) + "px";	
	var left = (x / 32 * 25) + "px";
	$(".pacman").css({"top": top, "left": left});
}

function moveGhost(x,y) {
	var top = (y / 32 * 25) + "px";	
	var left = (x / 32 * 25) + "px";
	$(".ghost").css({"top": top, "left": left});
}

generatePlayer(128,128);

generateGhost(64,64);




window.onkeydown = function (eventObject) {
    var key = eventObject.keyCode;
    if (key == 38) {
        // up arrow
        player.ydir -= 32;
        player.direction = "up";
        collisionDetect(player.direction);
    }
    else if (key == 40) {
        // down arrow
        player.ydir += 32;
        player.direction = "down";
        collisionDetect(player.direction);
    }
    else if (key == 37) {
       // left arrow
       player.xdir -= 32;
       player.direction = "left";
       collisionDetect(player.direction);
    }
    else if (key == 39) {
       // right arrow
       player.xdir += 32;
       player.direction = "right";
       collisionDetect(player.direction);
    }
    else {
        return 1;
    }
};




drawMap();

setInterval(ghostMovement,200);

var ghost = {
	direction: "right",
	xdir: 64,
	ydir: 64,
	y: 64,
	x: 64 
}


function ghostMovement() {
	if (ghost.direction == "right") {
		ghost.xdir += 32;
		collisionDetectGhost(ghost.direction);
	} else if (ghost.direction == "up") {
		ghost.ydir -= 32;
		collisionDetectGhost(ghost.direction);
	} else if (ghost.direction == "down") {
		ghost.ydir += 32;
		collisionDetectGhost(ghost.direction);
	} else if (ghost.direction == "left") {
		ghost.xdir -= 32;
		collisionDetectGhost(ghost.direction);
	}
}

var directions = ["left", "right", "up", "down"]

function collisionDetectGhost(direction){

    if(direction == "up" && map[(ghost.ydir/32)][(ghost.xdir/32)] == 0){
        ghost.y = ghost.ydir; //up    

    } else if(direction == "down" && map[(ghost.ydir/32)][(ghost.xdir/32)] == 0){
        ghost.y = ghost.ydir; //down

    } else if(direction == "left" && map[ghost.ydir/32][(ghost.xdir/32)] == 0){
        ghost.x = ghost.xdir; //left

    } else if(direction == "right" && map[ghost.ydir/32][(ghost.xdir/32)] == 0){
        ghost.x = ghost.xdir; //right
    } else {
    	var randomDirection = Math.floor(Math.random()*4);
    	var ghostDirection = directions[randomDirection];
    	console.log(randomDirection);
    	ghost.direction = ghostDirection;
    }

    ghost.xdir = ghost.x;
    ghost.ydir = ghost.y;
    moveGhost(ghost.xdir,ghost.ydir);
}

//pacman cannot move if heading toward a wall

//populate the dots in the maze

//incrememt points when running into dots

//create the ghosts

//randomize ghosts

//create end game when intersected with ghost

//create win condition when you eat all the dots

//create special fruit

//when intersect with fruit make ghosts eatable

//when ghosts are eatable gain points when intersect

//timeout for ghosts being eatable