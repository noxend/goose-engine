import { Entity } from "./Entity";
import { ComponentManager } from "./ComponentManager";

export interface Component {
  update?(dt: number): void;
  init?(): void;
}

export class Component {
  public ID: number;
  public componentManager: ComponentManager;

  static defaultParams: any;

  constructor(public entity: Entity, params: any) {
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        // @ts-ignore
        this[key] = params[key];
      }
    }
  }
}
