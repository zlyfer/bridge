class Stick {
	constructor(bridge) {
		this.bridge = bridge;
		this.height = 0;
		this.state = false;
		this.angle = 0;
	}

	update() {
		this.show();
	}

	show() {
		push();
		noStroke();
		fill(0);
		translate(
			(this.bridge.x + this.bridge.width),
			height - this.bridge.height
		);
		rotate(radians(this.angle));
		rect(-5, 0, 5, -this.height);
		pop();
	}

	grow() {
		this.height += 2;
	}

	flip() {
		this.angle += 10;
	}
}