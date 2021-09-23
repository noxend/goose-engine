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

    const ctx = this.canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    window.ctx = this.ctx = ctx;

    addEventListener("resize", this.resizeHandler);

    this.rootScene = this.currentScene = new Scene("root");
    this.addScene(this.rootScene);
  }

  private resizeHandler() {
    this.canvas.height = innerHeight;
    this.canvas.width = innerWidth;
    window.ctx.imageSmoothingEnabled = this.ctx.imageSmoothingEnabled = false;
  }

  public addScene(scene: Scene) {
    if (this.scenes.has(scene.name)) {
      console.warn("Entity name '${}' ", scene.name, "already exist");
    }

    this.scenes.set(scene.name, scene);
  }

  public init(): void {
    this.update();
  }

  public update(): void {
    requestAnimationFrame(this.update.bind(this));
  }
}

export default Engine;
