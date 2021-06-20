import { Component } from "core/Component";
import { AudioSource } from "./AudioSource";

export class AudioManager extends Component {
  private audios: { [name: string]: AudioSource };

  public data: Array<any>;

  public init(): void {
    for (const data of this.data) {
      this.audios[data.name] = new AudioSource(
        this.entity,
        this.entity.manager.componentManager,
        data
      );
    }
  }

  public play(name: string): void {
    if (!this.audios[name]) return;
    this.audios[name].play();
  }

  public pause(name: string): void {
    if (!this.audios[name]) return;
    this.audios[name].pause();
  }

  public stop(name: string): void {
    if (!this.audios[name]) return;
    this.audios[name].stop();
  }

  public pauseAll(): void {
    for (const name in this.audios) {
      this.audios[name].pause();
    }
  }

  public stopAll(): void {
    for (const name in this.audios) {
      this.audios[name].stop();
    }
  }
}

AudioSource.defaultParams = {
  data: [],
};
