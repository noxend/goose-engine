import { Sprite, Animation, AudioManager, Collision } from "@/core/components";
import Input, { Axis, KeyboardKey } from "@/core/Input";
import { Component } from "@/core/Component";

export class PlayerController extends Component {
  private audioManager: AudioManager;
  private animation: Animation;
  private collision: Collision;
  private sprite: Sprite;

  public speed: number;

  private onCollisionEnter = () => {
    // console.log("ok");
  };

  public init() {
    this.audioManager = this.entity.getComponent(AudioManager) as AudioManager;
    this.animation = this.entity.getComponent(Animation) as Animation;
    this.collision = this.entity.getComponent(Collision) as Collision;
    this.sprite = this.entity.getComponent(Sprite) as Sprite;

    // this.collision.evens.on("onCollisionEnter", this.onCollisionEnter);
  }

  public update(dt: number) {
    this.entity.velocity.x = Input.getAxis(Axis.HORIZONTAL) * this.speed * dt;

    if (Input.isKeyPressed(KeyboardKey.SPACE) && this.entity.velocity.y === 0) {
      this.entity.velocity.y = -10;
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

    this.entity.position.x += this.entity.velocity.x;
    this.entity.position.y += this.entity.velocity.y;
  }
}

PlayerController.defaultParams = {
  speed: 400,
};
