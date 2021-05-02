import { Component } from "../Component";

export class AudioSource extends Component {
  public audio: HTMLAudioElement;

  init() {
    this.audio = new Audio(this.src);
    this.audio.volume = this.volume;
  }

  public play() {
    this.audio.load();
    this.audio.play();
  }

  public pause() {
    if (!this.audio.ended) {
      this.audio.pause();
    }
  }

  update() {}
}

AudioSource.defaultParams = {
  volume: 1,
  src: "",
};
