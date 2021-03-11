import { Entity } from "./Entity";
import { ComponentManager } from "./ComponentManager";

export class Component {
  [k: string]: any;

  public ID: number;

  constructor(
    public entity: Entity,
    public manager: ComponentManager,
    params: any
  ) {
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        this[key] = params[key];
      }
    }
  }

  init() {}
  update() {}
}
