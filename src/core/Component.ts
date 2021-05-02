import { Entity } from "./Entity";
import { ComponentManager } from "./ComponentManager";

type A = {
  volume: number;
  [k: string]: any;
};

export class Component {
  public ID: number;
  static defaultParams: any;

  constructor(
    public entity: Entity,
    public manager: ComponentManager,
    params: any
  ) {
    this.awake();
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        this[key] = params[key];
      }
    }
  }

  awake() {}
  init() {}
  update(dt: number) {}

  [k: string]: any;
}
