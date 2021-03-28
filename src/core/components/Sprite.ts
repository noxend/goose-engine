import Vector from "../../utils/Vector";
import { Component } from "../Component";

export class Sprite extends Component {
  public size: Vector = new Vector(100, 100);
  public sprite: number;

  update() {
    window.ctx.save();
    window.ctx.translate(this.entity.position.x, this.entity.position.y);
    window.ctx.drawImage(
      this.image,
      this.sprite * 128,
      0,
      128,
      128,
      0,
      0,
      this.size.x,
      this.size.x
    );
    window.ctx.restore();
  }
}
