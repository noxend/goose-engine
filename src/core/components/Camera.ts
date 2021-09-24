import Vector from "../../utils/Vector";
import { Component } from "../Component";
import { Sprite } from "../components";
import { Entity } from "core/Entity";
import { clamp } from "@/utils";

interface CameraParams {
  target: Entity;
  smoothSpeed: number;
  viewport: Vector;
  backgroundColor?: string;
}

export class Camera extends Component {
  public viewport: Vector;
  public min: Vector;
  public max: Vector;
  public smoothSpeed: number;
  public target: Entity;
  public offset: number = 300;
  public backgroundColor: string = "#89f2ff";

  private sprite: Sprite;

  private isShaking: boolean = false;
  private shakeMagnitude: Vector = Vector.zero;
  private shakePos: Vector = Vector.zero;
  private elapsedShakeTime: number = 0;
  private shakeDuration: number = 0;

  constructor(params: CameraParams) {
    super(params);

    const { target, smoothSpeed, viewport, backgroundColor } = params;

    this.backgroundColor = this.backgroundColor ?? backgroundColor;
    this.smoothSpeed = smoothSpeed;
    this.viewport = viewport;
    this.target = target;
  }

  public shake(magnitude: Vector, duration: number) {
    this.isShaking = true;
    this.shakeMagnitude = magnitude;
    this.shakeDuration = duration;
  }

  private isDoneShaking() {
    return !this.isShaking || this.elapsedShakeTime >= this.shakeDuration;
  }

  public init() {
    this.sprite = this.target.getComponent(Sprite) as Sprite;
  }

  public update(dt: number) {
    const offset =
      this.sprite && this.sprite.flipX ? this.offset * -1 + this.sprite.size.x : this.offset;

    if (this.isDoneShaking()) {
      this.isShaking = false;
      this.shakeMagnitude = Vector.zero;
      this.shakeDuration = 0;
      this.elapsedShakeTime = 0;
    } else {
      this.elapsedShakeTime += dt;
      this.shakePos.x = Math.random() * this.shakeMagnitude.x;
      this.shakePos.y = Math.random() * this.shakeMagnitude.y;
    }

    const pos = Vector.lerp(
      this.entity.position,
      new Vector(
        this.target.position.x - this.viewport.x / 2 + offset,
        this.target.position.y - this.viewport.y / 2
      ),
      this.smoothSpeed * dt
    );

    this.entity.position.set(clamp(pos.x, 0, 3250), pos.y);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // ctx.fillStyle = this.backgroundColor;
    // ctx.fillRect(0, 0, this.viewport.x, this.viewport.y);

    ctx.scale(1, 1);
    ctx.translate(
      -this.entity.position.x + this.shakePos.x,
      -this.entity.position.y + this.shakePos.y
    );
  }
}
