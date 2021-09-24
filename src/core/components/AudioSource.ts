import { Component } from "../Component";

export interface AudioSourceParams {
  loop?: boolean;
  volume?: number;
  src: string;
}

export class AudioSource extends Component {
  public audio: HTMLAudioElement;

  public src: string;
  public volume: number;
  public loop: boolean;

  constructor(params: AudioSourceParams) {
    super(params);

    const { src, loop = false, volume = 1 } = params;

    this.volume = volume;
    this.loop = loop;
    this.src = src;
  }

  init() {
    if (!this.src) throw new Error("src");

    this.audio = new Audio(this.src);
    this.audio.volume = this.volume;
    this.audio.loop = this.loop;
  }

  public play(): void {
    if (!this.audio.paused) {
      this.stop();
    }
    this.audio.play();
  }

  public pause(): void {
    this.audio.pause();
  }

  public stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
