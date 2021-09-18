import { Entity } from "./Entity";
import { ComponentManager } from "./ComponentManager";

export interface Component {
  update?(dt: number): void;
  init?(): void;
}

export class Component {
  public componentManager: ComponentManager;
  public entity: Entity;
  public ID: number;
}
