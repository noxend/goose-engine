import { Scene } from "./Scene";

class Engine {
  public currentScene: Scene;
  public readonly rootScene: Scene;
  public readonly scenes = new Map<string, Scene>();
  public ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;

  public constructor() {
    this.canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;

    this.canvas.height = innerHeight;
    this.canvas.width = innerWidth;

    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.imageSmoothingEnabled = false;

    addEventListener("resize", this.resizeHandler);

    this.rootScene = this.currentScene = new Scene("root");
    this.addScene(this.rootScene);
  }

  private resizeHandler() {
    this.canvas.height = innerHeight;
    this.canvas.width = innerWidth;
    this.ctx.imageSmoothingEnabled = this.ctx.imageSmoothingEnabled = false;
  }

  public addScene(scene: Scene) {
    if (this.scenes.has(scene.name)) {
      console.warn("Entity name '${}' ", scene.name, "already exist");
    }

    this.scenes.set(scene.name, scene);
  }

  private loop(): void {}

  public init(): void {
    this.update();
  }

  public update(): void {
    requestAnimationFrame(this.update.bind(this));
  }

  public draw(): void {}
}

export default Engine;
