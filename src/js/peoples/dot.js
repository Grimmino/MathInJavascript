import { config } from '../config';

export class Dot {
	constructor(opt) {
		this.ctx = opt.ctx;
		this.vel = {
			x: 0,
			y: 0
		};
		this.pos = {
			x: opt.x,
			y: opt.y
		};
		this.radius = opt.radius || this.random(config.dotMinRadius, config.dotMaxRadius);
		this.mass = this.radius * config.massFactor;
		this.color = config.defaultColor;
	}

	random = (min, max) => {
		return Math.random() * (max - min) + min;
	};

	createCircle = (x, y, rad, fill, color) => {
		this.ctx.fillStyle = this.ctx.strokeStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(x, y, rad, 0, config.TWO_PI);
		this.ctx.closePath();
		fill ? this.ctx.fill() : this.ctx.stroke();
	};

	draw = (x, y) => {
		this.pos.x = x || this.pos.x + this.vel.x;
		this.pos.y = y || this.pos.y + this.vel.y;
		this.createCircle(this.pos.x, this.pos.y, this.radius, true, this.color);
		this.createCircle(this.pos.x, this.pos.y, this.radius, false, config.defaultColor);
	};
}
