import { Entity } from "core/Entity";
import Vector from "utils/Vector";

export class Camera {
  public position: Vector;

  constructor(private entity: Entity) {
    this.position = new Vector();
  }

  public update(dt: number) {
    const w = window.ctx.canvas.width;

    this.position.x = this.entity.position.x - w / 2;
  }
}
