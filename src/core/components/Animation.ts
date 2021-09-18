import { range, createElement } from "../../utils";
import { Component } from "../Component";
import { Sprite } from "./Sprite";

const currentAnimationDebug = createElement("animation");

interface AnimationsParams {
  animations: {
    [k: string]: { from: number; to: number; repeat?: boolean };
  };
  defaultAnimation: string;
}

export class Animation extends Component {
  public readonly animations: any;
  public readonly defaultAnimation: string;

  private lastTime: number;
  private sprite: Sprite;
  private index = 0;

  private current: string;
  private old: string;

  constructor({ animations, defaultAnimation }: AnimationsParams) {
    super();

    this.animations = animations;
    this.defaultAnimation = defaultAnimation;
  }

  init() {
    this.sprite = this.entity.getComponent(Sprite) as Sprite;
    this.old = this.current = this.defaultAnimation;

    this.lastTime = performance.now();

    for (const item in this.animations) {
      const anim = this.animations[item];

      if (anim.frames || anim.from === undefined || anim.to === undefined) continue;

      this.animations[item].frames = range(anim.from, anim.to);
    }
  }

  public setAnimationByName(name: string) {
    this.current = name;
  }

  private nextFrame(): void {
    const animation = this.animations[this.current];
    const frames = animation.frames;
    const repeat = animation.repeat;

    const isLastFrame = frames[frames.length - 1] === frames[this.index];

    if (isLastFrame) this.index = repeat ? 0 : this.index;
    else this.index += 1;

    this.sprite.setSprite(frames[this.index]);
  }

  update(dt: number) {
    const time = performance.now();

    if (!this.current) this.current = this.defaultAnimation;

    if (this.current !== this.old) {
      currentAnimationDebug.textContent = this.current;
      this.index = 0;
      this.old = this.current;
    }

    if (time - this.lastTime > 1 / dt) {
      this.nextFrame();
      this.lastTime = time;
    } else {
      this.sprite.setSprite(this.animations[this.current].frames[this.index]);
    }

    this.current = "";
  }
}
