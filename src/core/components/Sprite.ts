import Vector from "../../utils/Vector";
import { Component } from "../Component";
import { Camera } from "./Camera";

const unitSize = 100;

interface SpriteProps {
  size: Vector;
  spriteSize: Vector;
  image: HTMLImageElement;
  flipX?: boolean;
  sprite?: number;
}

export class Sprite extends Component {
  public image: HTMLImageElement;
  public spriteSize: Vector;
  public sprite: number;
  public flipX: boolean;
  public size: Vector;

  constructor({ image, spriteSize, size, flipX, sprite }: SpriteProps) {
    super();

    this.image = image;
    this.spriteSize = spriteSize;
    this.size = size;
    this.flipX = flipX || false;
    this.sprite = sprite || 0;
  }

  getByX = (i: number) => (i * this.spriteSize.x) % this.image.width;

  getByY = (i: number) =>
    Math.trunc((i * this.spriteSize.x) / this.image.width) * this.spriteSize.y;

  setSprite(value: number) {
    this.sprite = value;
  }

  update() {
    const camera = this.entity.manager.entitiesByName.get("camera");

    let x = this.entity.position.x;
    let y = this.entity.position.y;

    if (camera) {
      x -= camera.position.x;
      y -= camera.position.y;
    }

    window.ctx.save();
    window.ctx.translate(this.flipX ? x + this.size.x : x, y);
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
