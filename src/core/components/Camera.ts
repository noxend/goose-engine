import Vector from "../../utils/Vector";
import { Component } from "../Component";
import { Entity } from "core/Entity";

import { clamp } from "../../utils";
export class Camera extends Component {
  public target: Entity;
  public smoothSpeed: number;

  // public viewport = new Vector(700, 400);

  public update() {
    const entities = this.entity.manager.entities;
    const canvasWidth = window.ctx.canvas.width;
    const canvasHeight = window.ctx.canvas.height;

    const pos = Vector.lerp(
      this.entity.position,
      new Vector(
        this.target.position.x - canvasWidth / 2,
        this.target.position.y - canvasHeight / 2
      ),
      this.smoothSpeed
    );

    this.entity.position.x = clamp(pos.x, 0, 600);
    this.entity.position.y = clamp(pos.y, 0, 0);

    for (let i = 0; i < entities.length; i++) {
      // entities[i].position.sub(this.entity.position);
      // entities[i].position.x -= this.entity.position.x;
      // entities[i].position.y -= this.entity.position.y;
    }
  }
}

Camera.defaultParams = {
  smoothSpeed: 0.05,
  target: null,
};
