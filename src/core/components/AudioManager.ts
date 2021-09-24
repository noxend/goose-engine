import { Component } from "../Component";
import { AudioSource, AudioSourceParams } from "./AudioSource";

interface AudioManagerParams {
  sources: {
    [k: string]: AudioSourceParams;
  };
}

export class AudioManager extends Component {
  private audios: { [name: string]: AudioSource } = {};

  public sources: AudioManagerParams["sources"];

  constructor(params: AudioManagerParams) {
    super(params);

    this.sources = params.sources;
  }

  public init(): void {
    for (const name in this.sources) {
      this.audios[name] = this.entity.addComponent(
        new AudioSource(this.sources[name])
      ) as AudioSource;
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
