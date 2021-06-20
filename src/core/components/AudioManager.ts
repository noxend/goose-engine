import { Component } from "../Component";
import { AudioSource } from "./AudioSource";

export class AudioManager extends Component {
  private audios: { [name: string]: any } = {};

  public data: Array<any>;

  public init(): void {
    for (const name in this.data) {
      this.audios[name] = this.entity.addComponent(AudioSource, this.data[name]) as AudioSource;
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

AudioManager.defaultParams = {
  data: {},
};
