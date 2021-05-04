import { range, createElement } from "../../utils";
import { Component } from "../Component";
import { Sprite } from "./Sprite";

type Frames = {
  from: number;
  to: number;
};

const currentAnimationDebug = createElement("animation");
export class Animation extends Component {
  public readonly frames: Frames;
  public readonly animations: any;
  public readonly default: string;

  public readonly animations2: Map<string, any>;

  private lastTime: number;
  private sprite: Sprite;
  private index = 0;

  private current: string;
  private old: string;

  init() {
    this.sprite = this.entity.getComponent(Sprite) as Sprite;
    this.old = this.current = this.default;

    this.lastTime = performance.now();

    for (const item in this.animations) {
      const anim = this.animations[item];

      if (anim.frames || anim.from === undefined || anim.to === undefined)
        continue;

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

  update() {
    const time = performance.now();

    if (!this.current) this.current = this.default;

    if (this.current !== this.old) {
      currentAnimationDebug.textContent = this.current;
      this.index = 0;
      this.old = this.current;
    }

    if (time - this.lastTime > 120) {
      this.nextFrame();
      this.lastTime = time;
    } else {
      this.sprite.setSprite(this.animations[this.current].frames[this.index]);
    }

    this.current = "";
  }
}

Animation.defaultParams = {
  frames: { from: 0, to: 3 },
};
