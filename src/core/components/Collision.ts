import EventEmitter from "eventemitter3";
import Vector from "../../utils/Vector";
import { Component } from "../Component";

const defaultParams = new Map<string, any>([
  ["size", new Vector(100, 100)],
  ["center", new Vector()],
  ["debug", false],
]);

const drawCircle = (x: number, y: number, color = "white", r = 2.5) => {
  window.ctx.beginPath();
  window.ctx.arc(x, y, r, 0, 2 * Math.PI);
  window.ctx.fillStyle = color;
  window.ctx.fill();
};

const drawRectangle = () => {};

export class Collision extends Component {
  public collision: Collision[];
  public evens: EventEmitter;
  public center: Vector;
  public size: Vector;
  private debug: boolean;

  awake() {
    this.evens = new EventEmitter();
  }

  init() {
    defaultParams.forEach((value, key) => {
      if (!this[key]) this[key] = value;
    });

    this.collision = this.manager.filterByType(Collision) as Collision[];
  }

  public top(collision: Collision) {
    return collision.entity.position.x + collision.center.x;
  }

  public bottom(collision: Collision) {
    return collision.entity.position.x + collision.size.x + collision.center.x;
  }

  public right(collision: Collision) {
    return collision.entity.position.y + collision.size.y + collision.center.y;
  }

  public left(collision: Collision) {
    return collision.entity.position.y + collision.center.y;
  }

  private rectangleCollision(current: Collision, target: Collision) {
    return (
      this.top(current) <= this.bottom(target) &&
      this.right(current) >= this.left(target) &&
      this.bottom(current) >= this.top(target) &&
      this.left(current) <= this.right(target)
    );
  }

  draw() {
    window.ctx.save();
    window.ctx.beginPath();
    window.ctx.translate(this.entity.position.x, this.entity.position.y);
    window.ctx.rect(this.center.x, this.center.y, this.size.x, this.size.y);
    window.ctx.strokeStyle = "yellow";
    window.ctx.stroke();
    window.ctx.restore();
  }

  update() {
    if (this.debug) {
      this.draw();
    }

    const collisions: Collision[] = [];
    for (let i = 0; i < this.collision.length; i++) {
      if (this.collision[i] === this) continue;

      if (this.rectangleCollision(this, this.collision[i])) {
        collisions.push(this.collision[i]);
      }

      this.evens.emit("onCollisionEnter", collisions);
    }

    this.oldPos = this.entity.position;
  }
}
