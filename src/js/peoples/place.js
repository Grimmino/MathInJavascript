const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

import { Dot } from './dot';
import { config } from '../config';

class Place {
	constructor() {
		this.canvas = canvas;
		this.ctx = ctx;
		this.width = this.canvas.width = innerWidth;
		this.height = this.canvas.height = innerHeight;
		this.mouse = {
			x: this.width / 2,
			y: this.height / 2,
			down: false
		};

		this.dots = [];
	}

	init = () => {
		this.canvas.addEventListener('mousemove', this.setPos);
		window.addEventListener('mousedown', this.isDown);
		window.addEventListener('mouseup', this.isDown);

		this.dots.push(
			new Dot({
				ctx: this.ctx,
				x: this.mouse.x,
				y: this.mouse.y,
				radius: config.digDotRadius
			})
		);

		window.requestAnimationFrame(this.draw);
	};

	setPos = ({ layerX, layerY }) => {
		[this.mouse.x, this.mouse.y] = [layerX, layerY];
	};

	isDown = () => {
		this.mouse.down = !this.mouse.down;
	};

	updateDots = () => {
		for (let i = 1; i < this.dots.length; i++) {
			let acc = { x: 0, y: 0 };

			for (let j = 0; j < this.dots.length; j++) {
				if (i == j) continue;

				let [a, b] = [this.dots[i], this.dots[j]];

				//находим дельту
				let delta = {
					x: b.pos.x - a.pos.x,
					y: b.pos.y - a.pos.y
				};
				//вычисляем растояние по теореме Пифагора
				let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y) || 1;

				//высчитываем силу притяжения частиц
				let force = ((dist - config.sphereRadius) / dist) * b.mass;

				if (j == 0) {
					let alfa = config.mouseSize / dist;
					a.color = `rgba(250, 10, 30, ${alfa})`;
					dist < config.mouseSize ? (force = (dist - config.mouseSize) * b.mass) : (force = a.mass);
				}

				acc.x += delta.x * force;
				acc.y += delta.y * force;
			}

			//прибавим ускорение частицы к скорости
			this.dots[i].vel.x = this.dots[i].vel.x * config.smooth + acc.x * this.dots[i].mass;
			this.dots[i].vel.y = this.dots[i].vel.y * config.smooth + acc.y * this.dots[i].mass;
		}

		this.dots.map(e => (e == this.dots[0] ? e.draw(this.mouse.x, this.mouse.y) : e.draw()));
	};

	draw = () => {
		this.ctx.clearRect(0, 0, this.width, this.height);
		if (this.mouse.down) {
			this.dots.push(
				new Dot({
					ctx: this.ctx,
					x: this.mouse.x,
					y: this.mouse.y
				})
			);
		}

		this.updateDots();

		window.requestAnimationFrame(this.draw);
	};
}

const place = new Place();
place.init();
