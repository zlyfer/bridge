var
	bridges,
	stick,
	score,
	highscore,
	gamestate,
	manx;
var bridgeheight = 200;

function setup() {
	createCanvas(windowWidth, windowHeight);
	highscore = 0;
	reset();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(220);
	display();
	game();
}

function display() {
	push();
	textSize(16);
	textStyle(BOLD)
	textAlign(RIGHT, CENTER);
	text(`Score: ${score}`, width - 20, 20);
	text(`Highscore: ${highscore}`, width - 20, 40);
	pop();
}

function game() {
	bridges.forEach(b => {
		b.update();
	})
	if (
		bridges[0].x == bridges[0].xdest &&
		bridges[1].x == bridges[1].xdest &&
		gamestate == "waiting"
	) {
		gamestate = "running";
	}
	stick.update();
	if (gamestate == "running") {
		if (mouseIsPressed && stick.state == false) {
			stick.state = "growing";
		}
		if (!mouseIsPressed && stick.state == "growing") {
			stick.state = "grown";
		}
		if (stick.angle == 90) {
			stick.state = "flipped";
		}
	}
	switch (stick.state) {
		case "growing":
			stick.grow();
			break;
		case "grown":
			stick.flip();
			break;
		case "flipped":
			if (gamestate == "running") {
				gamestate = "stickmoving";
			}
			moveMan();
			break;
	}
	moveWaves();
}

function reset() {
	score = 0;
	bridges = [];
	newBridge(new Bridge(5, 30));
}

function newBridge(bridge) {
	manx = false;
	gamestate = "waiting";
	bridges = bridges.slice(1);
	if (bridge) {
		bridges.push(bridge);
	}
	bridges.push(new Bridge(round(random(60, height - bridgeheight)), round(random(20, 70))));
	bridges[0].xdest = 5;
	stick = new Stick(bridges[0]);
}

function checkResult() {
	let start = bridges[0].x + bridges[0].width + stick.height;
	if (
		start >= bridges[1].x &&
		start <= bridges[1].x + bridges[1].width
	) {
		gamestate = "won";
	} else {
		gamestate = "lost";
	}
	push();
	textAlign(CENTER);
	textSize(32);
	textStyle(BOLD);
	text(`GAME ${gamestate.toUpperCase()}`, width / 2, height / 3);
	pop();
}

function moveMan() {
	if (manx == false) {
		manx = bridges[0].x + bridges[0].width + 3;
	}
	let many = height - bridges[0].height;
	push();
	noStroke();
	fill(0);
	rect(manx - 3, many - 11, 6, 5);
	pop();
	if (gamestate == "stickmoving") {
		manx++
	}
	if (manx >= bridges[0].x + bridges[0].width + stick.height + 3) {
		checkResult();
	}
}

function moveWaves() {}

function mousePressed() {
	switch (gamestate) {
		case "running":
			break;
		case "won":
			score += 1;
			if (score > highscore) {
				highscore = score;
			}
			newBridge();
			break;
		case "lost":
			reset();
			break;
		case "stickmoving":
			manx = bridges[0].x + bridges[0].width + stick.height + 3;
			break;
	}
}