import Vector from "../../utils/Vector";
import { Component } from "../Component";
import { Entity } from "core/Entity";

interface CameraParams {
  target: Entity;
  smoothSpeed: number;
}

export class Camera extends Component {
  public viewport: Vector;
  public min: Vector;
  public max: Vector;
  public smoothSpeed: number;
  public target: Entity;

  constructor({ target, smoothSpeed }: CameraParams) {
    super();

    this.smoothSpeed = smoothSpeed;
    this.target = target;
  }

  init() {
    this.viewport = new Vector(window.ctx.canvas.width, window.ctx.canvas.height);
  }

  public update() {
    const pos = Vector.lerp(
      this.entity.position,
      new Vector(
        this.target.position.x - this.viewport.x / 2,
        this.target.position.y - this.viewport.y / 2
      ),
      this.smoothSpeed
    );

    // this.entity.position.set(
    //   clamp(pos.x, this.min.x, this.max.x),
    //   clamp(pos.y, this.min.y, this.max.y)
    // );

    this.entity.position.set(pos.x, pos.y);
  }
}
