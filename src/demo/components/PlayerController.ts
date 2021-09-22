import { Sprite, Animation, AudioManager, Collision } from "@/core/components";
import Input, { Axis, KeyboardKey } from "@/core/Input";
import { Component } from "@/core/Component";
import { createElement } from "@/utils";

const coinsDebug = createElement("coins", `0`);

interface PlayerControllerParams {
  speed: number;
}

export class PlayerController extends Component {
  private audioManager: AudioManager;
  private animation: Animation;
  private sprite: Sprite;

  public speed: number;

  public coins = 0;

  constructor(params: PlayerControllerParams) {
    super(params);

    this.speed = params.speed;
  }

  public init() {
    this.audioManager = this.entity.getComponent(AudioManager) as AudioManager;
    this.animation = this.entity.getComponent(Animation) as Animation;
    this.sprite = this.entity.getComponent(Sprite) as Sprite;
  }

  public update(dt: number) {
    this.entity.velocity.x = Input.getAxis(Axis.HORIZONTAL) * this.speed * dt;

    if (Input.isKeyPressed(KeyboardKey.SPACE) && this.entity.velocity.y === 0) {
      this.entity.velocity.y = -500 * dt;
      this.audioManager.play("jump");
    }

    if (Input.getAxis(Axis.HORIZONTAL) !== 0) {
      this.animation.setAnimationByName("run");
    }

    if (this.entity.velocity.y < 0) {
      this.animation.setAnimationByName("jump");
    }

    if (this.entity.velocity.y > 0) {
      this.animation.setAnimationByName("landing");
    }

    if (Input.getAxis(Axis.HORIZONTAL) === -1) {
      this.sprite.flipX = true;
    }

    if (Input.getAxis(Axis.HORIZONTAL) === 1) {
      this.sprite.flipX = false;
    }

    coinsDebug.textContent = `${this.coins}`;

    this.entity.position.x += this.entity.velocity.x;
    this.entity.position.y += this.entity.velocity.y;
  }

  public addCoin(): void {
    this.audioManager.play("coin");
    this.coins++;
  }
}

// PlayerController.defaultParams = {
//   speed: 400,
// };
