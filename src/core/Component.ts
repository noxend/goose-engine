import { Entity } from "./Entity";
import { ComponentManager } from "./ComponentManager";

export class Component {
  public ID: number;
  static defaultParams: any;

  constructor(public entity: Entity, params: any) {
    this.awake();
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        // @ts-ignore
        this[key] = params[key];
      }
    }
  }

  awake() {}
  init() {}
  update(dt: number) {}
}
