import { Sprite, Animation, AudioManager } from "@/core/components";
import Input, { Axis, KeyboardKey } from "@/core/Input";
import { Component } from "@/core/Component";

export class PlayerController extends Component {
  private audioManager: AudioManager;
  private animation: Animation;
  private sprite: Sprite;

  public speed: number;

  public init() {
    this.audioManager = this.entity.getComponent(AudioManager) as AudioManager;
    this.animation = this.entity.getComponent(Animation) as Animation;
    this.sprite = this.entity.getComponent(Sprite) as Sprite;
  }

  public update(dt: number) {
    this.entity.velocity.x = Input.getAxis(Axis.HORIZONTAL) * this.speed * dt;
    this.entity.velocity.y = Input.getAxis(Axis.VERTICAL) * this.speed * dt;

    if (Input.isKeyPressed(KeyboardKey.SPACE)) {
      this.audioManager.play("jump");
    }

    if (Input.getAxis(Axis.HORIZONTAL) !== 0) {
      this.animation.setAnimationByName("run");
    }

    if (Input.getAxis(Axis.HORIZONTAL) === -1) {
      this.sprite.flipX = true;
    }

    if (Input.getAxis(Axis.HORIZONTAL) === 1) {
      this.sprite.flipX = false;
    }

    this.entity.position.x += this.entity.velocity.x;
    this.entity.position.y += this.entity.velocity.y;
  }
}

PlayerController.defaultParams = {
  speed: 400,
};
