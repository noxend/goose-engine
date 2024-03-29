import EventEmitter from "eventemitter3";
import { RigidBody } from ".";
import { createElement } from "../../utils";
import Vector from "../../utils/Vector";
import { Component } from "../Component";

const position_x = createElement("position_x", "");
const position_y = createElement("position_x", "");

const velocity_x = createElement("velocity_y", "");
const velocity_y = createElement("velocity_y", "");

interface CollisionParams {
  size: Vector;
  center: Vector;
  debug?: boolean;
  active?: boolean;
  trigger?: boolean;
  static?: boolean;
}

export class Collision extends Component {
  public ee = new EventEmitter();

  public rigidBody: RigidBody;
  public collision: Collision[];
  public center: Vector;
  public size: Vector;
  public debug: boolean;
  public trigger: boolean;

  constructor(params: CollisionParams) {
    super(params);

    const { size, active, center, debug, trigger } = params;

    this.size = size;
    this.center = center;
    this.trigger = trigger || false;
    this.debug = debug || false;
    this.active = active || false;
    this.static = params.static || false;
  }

  init() {
    this.collision = this.componentManager.filterByType(Collision) as Collision[];
    this.rigidBody = this.entity.getComponent(RigidBody) as RigidBody;
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

  private debugDraw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.entity.position.x, this.entity.position.y);
    ctx.rect(this.center.x, this.center.y, this.size.x, this.size.y);
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.restore();
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
        this.entity.oldPosition.x = this.entity.position.x = target.left - this.size.x;

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
        this.entity.oldPosition.y = this.entity.position.y = target.top - this.size.y;

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
  public type: string;

  public triggered = false;

  update(dt: number) {
    const collisions: Collision[] = [];
    this.collision = this.componentManager.filterByType(Collision) as Collision[];

    if (this.rigidBody) {
      for (let i = 0; i < this.collision.length; i++) {
        if (this.collision[i] === this) continue;

        const collision = this.collision[i];

        if (!this?.collision[i]?.trigger) {
          if (this.collision[i]?.type === "left") {
            this.leftCollision(this.collision[i]);
          } else {
            this.bottomCollision(this.collision[i]);
          }
        }

        if (this.rectangleCollisionDetector(collision)) {
          collisions.push(collision);

          if (collision.trigger && !collision.triggered) {
            collision.triggered = true;
            collision.ee.emit("onTriggerEnter", this);
          }
        } else {
          if (collision.trigger && collision.triggered) {
            collision.triggered = false;
          }
        }

        this.ee.emit("onCollisionEnter", collisions);
      }

      if (this.entity.name === "player") {
        position_x.textContent = `Pos X: ${this.entity.position.x.toFixed(2)}`;
        position_y.textContent = `Pos Y: ${this.entity.position.y.toFixed(2)}`;

        velocity_x.textContent = `Vel X: ${this.entity.velocity.x.toFixed(2)}`;
        velocity_y.textContent = `Vel Y: ${this.entity.velocity.y.toFixed(2)}`;
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.debug) {
      this.debugDraw(ctx);
    }
  }
}
