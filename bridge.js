class Bridge {
	constructor(xdest, w) {
		this.x = width;
		this.xdest = xdest;
		this.width = w;
		this.height = bridgeheight;
	}

	update() {
		this.move();
		this.show();
	}

	move() {
		if (this.x > this.xdest) {
			this.x -= width / 20;
		}
		if (this.x < this.xdest) {
			this.x = this.xdest;
		}
	}

	show() {
		push();
		noStroke();
		fill(0);
		rect(this.x, height - this.height, this.width, this.height);
		pop();
	}
}