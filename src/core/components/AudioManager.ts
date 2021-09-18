import { Component } from "../Component";
import { AudioSource } from "./AudioSource";

export class AudioManager extends Component {
  private audios: { [name: string]: AudioSource } = {};

  public sources: Array<any>;

  public init(): void {
    for (const name in this.sources) {
      // this.audios[name] = this.entity.addComponent(new AudioSource(), this.sources[name]) as AudioSource;
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
