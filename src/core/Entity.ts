import Vector from "../utils/Vector";
import { EntityManager } from "./EntityManager";
import { Component } from "./Component";

export class Entity {
  public components: Map<typeof Component, Component>;

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
}
