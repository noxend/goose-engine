import Vector from "../../utils/Vector";
import { Component } from "../Component";
import { Entity } from "core/Entity";
import { clamp } from "@/utils";

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

  constructor(params: CameraParams) {
    super(params);

    const { target, smoothSpeed } = params;

    this.smoothSpeed = smoothSpeed;
    this.target = target;
  }

  init() {
    this.viewport = new Vector(window.ctx.canvas.width, window.ctx.canvas.height);
  }

  public update(dt: number) {
    const pos = Vector.lerp(
      this.entity.position,
      new Vector(
        this.target.position.x - this.viewport.x / 2,
        this.target.position.y - this.viewport.y / 2
      ),
      this.smoothSpeed * dt
    );

    this.entity.position.set(clamp(pos.x, 0, 1000), 0);

    window.ctx.scale(1, 1);
    window.ctx.translate(-this.entity.position.x, -this.entity.position.y);
  }
}
