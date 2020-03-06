export class Shield {
	constructor(opt) {
		this.canvas = opt.canvas;
		this.ctx = opt.ctx;
		this.radius = 50;
		this.color = '#000';
	}

	init = () => {
		this.canvas.addEventListener('mousemove', this.mouseXY);
	};

	mouseXY = e => {
		this.mouseX = e.pageX - 25;
		this.mouseY = e.pageY - 25;
	};

	draw = () => {
		this.ctx.beginPath();
		this.ctx.arc(this.mouseX, this.mouseY, this.radius, 0, 2 * Math.PI, true);
		this.ctx.strokeStyle = this.color;
		this.ctx.lineWidth = 3;
		this.ctx.stroke();
		this.ctx.closePath();
	};
}
