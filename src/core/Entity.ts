import Vector from "../utils/Vector";
import { EntityManager } from "./EntityManager";
import { Component } from "./Component";

export class Entity {
  public components: Map<typeof Component, Component>;
  public manager: EntityManager;

  public velocity = new Vector();
  public oldPosition = new Vector();

  constructor(public name: string, public position: Vector) {
    this.components = new Map();
  }

  public transform: Vector;

  public destroy() {
    this.manager.destroy(this);
  }

  public addComponent(C: typeof Component, params?: any) {
    const component = new C(this, params);
    this.components.set(C, component);

    return this.manager.addComponentToEntity(this, C, params);
  }

  public getComponent(C: typeof Component) {
    return this.components.get(C);
  }

  public update(dt: number) {
    this.components.forEach((c) => c.update(dt));
  }
}
