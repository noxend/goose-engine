import Vector from "../../utils/Vector";
import { Component } from "../Component";

const unitSize = 100;

export class Sprite extends Component {
  public image: HTMLImageElement;
  public spriteSize: Vector;
  public sprite: number;
  public flipX: boolean;
  public size: Vector;

  getByX = (i: number) => (i * this.spriteSize.x) % this.image.width;

  getByY = (i: number) =>
    Math.trunc((i * this.spriteSize.x) / this.image.width) * this.spriteSize.y;

  setSprite(value: number) {
    this.sprite = value;
  }

  update() {
    window.ctx.save();
    window.ctx.translate(
      this.flipX
        ? this.entity.position.x + this.size.x
        : this.entity.position.x,
      this.entity.position.y
    );
    this.flipX && window.ctx.scale(-1, 1);
    window.ctx.drawImage(
      this.image,
      this.getByX(this.sprite),
      this.getByY(this.sprite),
      this.spriteSize.x,
      this.spriteSize.y,
      0,
      0,
      this.size.x,
      this.size.x
    );
    window.ctx.restore();
  }
}

Sprite.defaultParams = {
  size: new Vector(unitSize, unitSize),
  spriteSize: new Vector(),
  image: HTMLImageElement,
  flipX: false,
  sprite: 0,
};
