import { Entity } from "./Entity";
import { ComponentManager } from "./ComponentManager";

export interface Component {
  update?(dt: number): void;
  init?(): void;
}

export abstract class Component {
  public componentManager: ComponentManager;
  public entity: Entity;
  protected params: any;

  public constructor(params?: any) {
    this.params = params;
  }
}
