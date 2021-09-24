import Vector from "../../utils/Vector";
import { Component } from "../Component";

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

  constructor(params: SpriteProps) {
    super(params);

    const { image, spriteSize, size, flipX, sprite } = params;

    this.image = image;
    this.spriteSize = spriteSize;
    this.size = size;
    this.flipX = flipX || false;
    this.sprite = sprite || 0;
  }

  public getByX = (i: number): number => (i * this.spriteSize.x) % this.image.width;

  public getByY = (i: number): number =>
    Math.trunc((i * this.spriteSize.x) / this.image.width) * this.spriteSize.y;

  public setSprite(value: number) {
    this.sprite = value;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.translate(
      this.flipX ? this.entity.position.x + this.size.x : this.entity.position.x,
      this.entity.position.y
    );

    ctx.scale(this.flipX ? -1 : 1, 1);

    ctx.drawImage(
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

    ctx.restore();
  }
}
