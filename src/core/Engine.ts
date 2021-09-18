class Engine {
  public constructor() {}

  public init(): void {
    this.update();
  }

  public update(): void {
    requestAnimationFrame(this.update.bind(this));
  }
}

export default Engine;
