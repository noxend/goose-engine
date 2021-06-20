import Vector from "../utils/Vector";
import { EntityManager } from "./EntityManager";
import { Component } from "./Component";

export class Entity {
  public components: Map<typeof Component, Component>;

  public velocity = new Vector();
  public oldPosition = new Vector();

  constructor(
    public name: string,
    public manager: EntityManager,
    public position: Vector
  ) {
    this.components = new Map();
  }

  public transform: Vector;

  public destroy() {
    this.manager.destroy(this);
  }

  public addComponent(C: typeof Component, params?: any) {
    this.manager.addComponentToEntity(this, C, params);
    return this;
  }

  public getComponent(C: typeof Component) {
    return this.components.get(C);
  }

  public update(dt: number) {
    this.components.forEach((c) => c.update(dt));
  }
}
