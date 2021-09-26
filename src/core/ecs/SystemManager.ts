import { System } from "./System";

export class SystemManager {
  public systems: System[] = [];

  public add(system: System): void {
    this.systems.push(system);
    this.systems.sort((a, b) => a.priority - b.priority);
  }

  public init(): void {
    for (const system of this.systems) {
      system.init();
    }
  }

  public update(dt: number): void {
    for (const system of this.systems) {
      system.update(dt);
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    for (const system of this.systems) {
      system.render(ctx);
    }
  }
}
