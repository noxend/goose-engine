import EventEmitter from "eventemitter3";
import { createElement } from "../../utils";
import Vector from "../../utils/Vector";
import { Component } from "../Component";

const position_x = createElement("position_x", "");
const position_y = createElement("position_x", "");

const velocity_x = createElement("velocity_y", "");
const velocity_y = createElement("velocity_y", "");

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
    this.collision = this.componentManager.filterByType(Collision) as Collision[];
  }

  get top() {
    return this.entity.position.y + this.center.y;
  }

  get left() {
    return this.entity.position.x + this.center.x;
  }

  get right() {
    return this.entity.position.x + this.size.x + this.center.x;
  }

  get bottom() {
    return this.entity.position.y + this.size.y + this.center.y;
  }

  get _center() {
    return new Vector(
      this.entity.position.x + this.size.x * 0.5,
      this.entity.position.y + this.size.y * 0.5
    );
  }

  private rectangleCollisionDetector(target: Collision) {
    return (
      this.top <= target.bottom &&
      this.right >= target.left &&
      this.bottom >= target.top &&
      this.left <= target.right
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

  public col: string[] = [];

  public speed = new Vector(250, 250);

  leftCollision = (target: Collision) => {
    if (this.isMovingLeft) {
      if (
        this.left < target.right &&
        this.entity.oldPosition.x >= target.right &&
        this.top < target.bottom &&
        this.bottom > target.top
      ) {
        this.entity.velocity.x = 0;
        this.entity.oldPosition.x = this.entity.position.x = target.right;

        return true;
      }
    }

    return false;
  };

  topCollision = (target: Collision) => {
    if (this.isMovingUp) {
      if (
        this.top < target.bottom &&
        this.entity.oldPosition.y >= target.bottom &&
        this.left < target.right &&
        this.right > target.left
      ) {
        this.entity.velocity.y = 0;
        this.entity.oldPosition.y = this.entity.position.y = target.bottom;

        return true;
      }
    }

    return false;
  };

  rightCollision = (target: Collision) => {
    if (this.entity.velocity.x > 0) {
      if (
        this.right > target.left &&
        this.entity.oldPosition.x <= target.left &&
        this.top < target.bottom &&
        this.bottom > target.top
      ) {
        this.entity.velocity.x = 0;
        this.entity.oldPosition.x = this.entity.position.x =
          target.left - this.size.x;

        return true;
      }
    }

    return false;
  };

  response = (target: Collision) => {
    if (this.leftCollision(target)) return "left";
  };

  bottomCollision = (target: Collision) => {
    if (this.isMovingDown) {
      if (
        this.bottom > target.top &&
        this.entity.oldPosition.y <= target.top &&
        this.left < target.right &&
        this.right > target.left
      ) {
        this.entity.velocity.y = 0;
        this.entity.oldPosition.y = this.entity.position.y =
          target.top - this.size.y;

        return true;
      }
    }

    return false;
  };

  get isMoving() {
    return (
      this.entity.position.x !== this.entity.oldPosition.x ||
      this.entity.position.y !== this.entity.oldPosition.y
    );
  }

  get isMovingRight() {
    return this.entity.position.x > this.entity.oldPosition.x;
  }

  get isMovingLeft() {
    return this.entity.position.x < this.entity.oldPosition.x;
  }

  get isMovingUp() {
    return this.entity.position.y < this.entity.oldPosition.y;
  }

  get isMovingDown() {
    return this.entity.position.y > this.entity.oldPosition.y;
  }

  public active: boolean;
  public static: boolean;
  public trigger: boolean;
  public type: string;

  update(dt: number) {
    const collisions: Collision[] = [];

    if (this.active) {
      if (!this?.static) {
        this.entity.velocity.y += 20 * dt;
      }

      this.entity.position.x += this.entity.velocity.x;
      this.entity.position.y += this.entity.velocity.y;

      for (let i = 0; i < this.collision.length; i++) {
        if (this.collision[i] === this) continue;

        if (!this?.collision[i]?.trigger) {
          if (this.collision[i]?.type === "left") {
            this.leftCollision(this.collision[i]);
          } else {
            this.bottomCollision(this.collision[i]);
          }
        }

        if (this.rectangleCollisionDetector(this.collision[i])) {
          collisions.push(this.collision[i]);
        }

        this.evens.emit("onCollisionEnter", collisions);
      }

      if (this.entity.name === "player") {
        position_x.textContent = `Pos X: ${this.entity.position.x.toFixed(2)}`;
        position_y.textContent = `Pos Y: ${this.entity.position.y.toFixed(2)}`;

        velocity_x.textContent = `Vel X: ${this.entity.velocity.x.toFixed(2)}`;
        velocity_y.textContent = `Vel Y: ${this.entity.velocity.y.toFixed(2)}`;
      }
    }

    if (this.debug) {
      // this.draw();
    }
  }
}

Collision.defaultParams = {
  size: new Vector(100, 100),
  center: new Vector(),
  debug: false,
  active: false,
};
