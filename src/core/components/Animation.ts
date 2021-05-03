import { range } from "../../utils";
import { Component } from "../Component";
import { Sprite } from "./Sprite";

type Frames = {
  from: number;
  to: number;
};

export class Animation extends Component {
  public frames: Frames;
  public animations: any;
  public default: string;

  private lastTime = performance.now();
  private index = 0;
  private sprite: Sprite;

  private framesRange: ReadonlyArray<number>;

  private old: string;

  init() {
    this.sprite = this.entity.getComponent(Sprite) as Sprite;
    this.framesRange = range(this.frames.from, this.frames.to);

    this.old = this.default;
  }

  private nextFrame(): void {
    const animation = this.animations[this.default];
    const range = animation.range;
    const repeat = animation.repeat;

    const isLastFrame = range[range.length - 1] === range[this.index];

    if (isLastFrame && !repeat) return this.sprite.setSprite(range[this.index]);

    if (isLastFrame) this.index = repeat ? 0 : this.index;
    else this.index += 1;

    this.sprite.setSprite(range[this.index]);
  }

  update() {
    const time = performance.now();

    if (this.default !== this.old) {
      this.index = 0;
      this.old = this.default;
    }

    if (time - this.lastTime > 120) {
      this.nextFrame();
      this.lastTime = time;
    } else {
      this.sprite.setSprite(this.animations[this.default].range[this.index]);
    }
  }
}

Animation.defaultParams = {
  frames: { from: 0, to: 3 },
};
