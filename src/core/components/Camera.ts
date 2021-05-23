import Vector from "../../utils/Vector";
import { Component } from "../Component";
import { Entity } from "core/Entity";

import { clamp } from "../../utils";
export class Camera extends Component {
  public target: Entity;
  public smoothSpeed: number;
  public viewport: Vector;
  public min: Vector;
  public max: Vector;

  init() {
    this.viewport = new Vector(
      window.ctx.canvas.width,
      window.ctx.canvas.height
    );
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

    this.entity.position.set(
      clamp(pos.x, this.min.x, this.max.x),
      clamp(pos.y, this.min.y, this.max.y)
    );
  }
}

Camera.defaultParams = {
  viewport: new Vector(900, 600),
  max: new Vector(950, 0),
  min: new Vector(0, -200),
  smoothSpeed: 0.1,
  target: null,
};
