import { Component } from "../Component";

export class AudioSource extends Component {
  public audio: HTMLAudioElement;

  public src: string;
  public volume: number;
  public loop: boolean;

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

AudioSource.defaultParams = {
  loop: false,
  volume: 1,
  src: "",
};
