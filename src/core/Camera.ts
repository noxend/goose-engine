import Vector from "../utils/Vector";
import { Component } from "./Component";

export class Camera extends Component {
  public position: Vector = new Vector();

  public update() {
    const entities = this.entity.manager.entities;
    const canvasWidth = window.ctx.canvas.width;
    const canvasHeight = window.ctx.canvas.height;

    this.position.x = this.entity.position.x - canvasWidth / 2;
    this.position.y = this.entity.position.y - canvasHeight / 2;

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];

      // entity.position = Vector.lerp(this.position, entity.position, 0.2);
      entity.position.x -= this.position.x;
      entity.position.y -= this.position.y;
    }
  }
}
