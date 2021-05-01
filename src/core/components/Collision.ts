import EventEmitter from "eventemitter3";
import Vector from "../../utils/Vector";
import { Component } from "../Component";
import { Entity } from "../Entity";
import Input, { Axis, KeyboardKey } from "../Input";

const defaultParams = new Map<string, any>([
  ["size", new Vector(100, 100)],
  ["center", new Vector()],
  ["debug", false],
  ["active", false],
]);

export class Collision extends Component {
  public collision: Collision[];
  public evens: EventEmitter;
  public center: Vector;
  public size: Vector;
  private debug: boolean;

  setOnGround = (value: boolean) => {
    this.onGround = value;
  };

  awake() {
    this.evens = new EventEmitter();
  }

  init() {
    defaultParams.forEach((value, key) => {
      if (!this[key]) this[key] = value;
    });

    this.collision = this.manager.filterByType(Collision) as Collision[];
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
      this.top < target.bottom &&
      this.right > target.left &&
      this.bottom > target.top &&
      this.left < target.right
    );
  }

  private rectangleCollisionResolver(current: Collision, target: Collision) {
    const v = new Vector(
      current.entity.position.x +
        current.size.x / 2 -
        (target.entity.position.x + target.size.x / 2),
      current.entity.position.y +
        current.size.y / 2 -
        (target.entity.position.y + target.size.y / 2)
    );

    let colDir = [];

    const s = new Vector(
      current.size.x / 2 + target.size.x / 2,
      current.size.y / 2 + target.size.y / 2
    );

    if (Math.abs(v.x) < s.x && Math.abs(v.y) < s.y) {
      const o = new Vector(s.x - Math.abs(v.x), s.y - Math.abs(v.y));

      if (o.x >= o.y && o.y <= o.x) {
        if (v.y > 0) {
          colDir.push("TOP");
          current.entity.position.y += o.y;
        } else {
          colDir.push("BOTTOM");
          current.entity.position.y -= o.y;
          // current.entity.velocity.x = 0;
        }
      } else {
        if (v.x > 0) {
          colDir.push("LEFT");
          current.entity.position.x += o.x;
        } else {
          colDir.push("RIGHT");
          current.entity.position.x -= o.x;
        }
      }
    }

    if (this.active && target.entity.name === "wall") {
      window.ctx.fillStyle = "yellow";
      window.ctx.font = "normal 16pt Arial";
      window.ctx.fillText(`${Math.abs(v.x)}`, 50, 50);
    }

    return colDir;
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

  resolveCollision(rectangle: Collision, type?: string) {
    const v = Vector.sub(this._center, rectangle._center);

    // if (v.x > 0) {
    //   this.entity.position.x = rectangle.right;
    //   this.entity.velocity.x *= 0;
    // } else {
    //   this.entity.position.x = rectangle.entity.position.x - this.size.x;
    //   this.entity.velocity.x *= 0;
    // }

    // if (v.y * v.y > v.x * v.x) {
    //   if (v.y > 0) {
    //     this.entity.position.y = rectangle.bottom;
    //     this.entity.velocity.y *= 0;
    //   } else {
    //     this.entity.position.y = rectangle.entity.position.y - this.size.y;
    //     this.entity.velocity.y *= 0;
    //   }
    // }
  }

  public speed = new Vector(250, 250);

  leftCollision = (target: Collision) => {
    if (this.isMovingLeft) {
      if (
        this.left < target.right &&
        this.entity.old_position.x >= target.right &&
        this.top < target.bottom &&
        this.bottom > target.top
      ) {
        this.entity.velocity.x = 0;
        this.entity.old_position.x = this.entity.position.x = target.right;

        return true;
      }
    }

    return false;
  };

  topCollision = (target: Collision) => {
    if (this.isMovingUp) {
      if (
        this.top < target.bottom &&
        this.entity.old_position.y >= target.bottom &&
        this.left < target.right &&
        this.right > target.left
      ) {
        this.entity.velocity.y = 0;
        this.entity.old_position.y = this.entity.position.y = target.bottom;

        return true;
      }
    }

    return false;
  };

  rightCollision = (target: Collision) => {
    if (this.entity.velocity.x > 0) {
      if (
        this.right > target.left &&
        this.entity.old_position.x <= target.left &&
        this.top < target.bottom &&
        this.bottom > target.top
      ) {
        this.entity.velocity.x = 0;
        this.entity.old_position.x = this.entity.position.x =
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
        this.entity.old_position.y <= target.top &&
        this.left < target.right &&
        this.right > target.left
      ) {
        this.entity.velocity.y = 0;
        this.entity.old_position.y = this.entity.position.y =
          target.top - this.size.y;

        return true;
      }
    }

    return false;
  };

  get isMoving() {
    return (
      this.entity.position.x !== this.entity.old_position.x ||
      this.entity.position.y !== this.entity.old_position.y
    );
  }

  get isMovingRight() {
    return this.entity.position.x > this.entity.old_position.x;
  }

  get isMovingLeft() {
    return this.entity.position.x < this.entity.old_position.x;
  }

  get isMovingUp() {
    return this.entity.position.y < this.entity.old_position.y;
  }

  get isMovingDown() {
    return this.entity.position.y > this.entity.old_position.y;
  }

  update(dt: number) {
    const collisions: Collision[] = [];

    if (this.active) {
      this.entity.velocity.x = Input.getAxis(Axis.HORIZONTAL) * 500 * dt;
      this.entity.velocity.y = Input.getAxis(Axis.VERTICAL) * 500 * dt;

      if (
        Input.isKeyPressed(KeyboardKey.SPACE) ||
        Input.isKeyPressed(KeyboardKey.ARROW_UP) ||
        Input.isKeyPressed(KeyboardKey.W)
      ) {
        this.entity.velocity.y -= 100 * dt;
      }

      // this.entity.velocity.y += 30 * dt;

      this.entity.old_position.x = this.entity.position.x;
      this.entity.old_position.y = this.entity.position.y;

      this.entity.position.x += this.entity.velocity.x;
      this.entity.position.y += this.entity.velocity.y;

      window.ctx.fillStyle = "yellow";
      window.ctx.font = "normal 16pt Arial";

      window.ctx.fillText(
        `${this.entity.position.x} ${this.entity.position.y}`,
        50,
        50
      );

      for (let i = 0; i < this.collision.length; i++) {
        if (this.collision[i] === this) continue;

        window.ctx.fillStyle = "yellow";
        window.ctx.font = "normal 16pt Arial";

        const side = this.response(this.collision[i]);

        window.ctx.fillText(`${side || ""}`, 50, 110);

        // if (this.rectangleCollisionDetector(this.collision[i])) {
        //   this.resolveCollision(this.collision[i]);
        //   collisions.push(this.collision[i]);
        // }

        // this.evens.emit("onCollisionEnter", collisions);
      }
    }

    if (this.debug) {
      this.draw();
    }
  }
}
