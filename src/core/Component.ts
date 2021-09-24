import { Entity } from "./Entity";
import { ComponentManager } from "./ComponentManager";

export abstract class Component {
  public componentManager: ComponentManager;
  public entity: Entity;
  protected params: any;

  public constructor(params?: any) {
    this.params = params;
  }

  public update(dt: number): void {}

  public init(): void {}

  public draw(ctx: CanvasRenderingContext2D): void {}
}
