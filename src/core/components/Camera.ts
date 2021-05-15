import Vector from "../../utils/Vector";
import { Component } from "../Component";
import { Entity } from "core/Entity";

export class Camera extends Component {
  public target: Entity;
  public smoothSpeed: number;

  public update() {
    const entities = this.entity.manager.entities;
    const canvasWidth = window.ctx.canvas.width;
    const canvasHeight = window.ctx.canvas.height;

    this.entity.position = Vector.lerp(
      this.entity.position,
      new Vector(
        this.target.position.x - canvasWidth / 2,
        this.target.position.y - canvasHeight / 2
      ),
      this.smoothSpeed
    );

    for (let i = 0; i < entities.length; i++) {
      entities[i].position.sub(this.entity.position);
    }
  }
}

Camera.defaultParams = {
  smoothSpeed: 0.05,
  target: null,
};
