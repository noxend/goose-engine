import Vector from "../utils/Vector";
import { EntityManager } from "./EntityManager";
import { Component } from "./Component";

export class Entity {
  public components: Component[] = [];
  public manager: EntityManager;

  public velocity = new Vector();
  public oldPosition = new Vector();

  constructor(public name: string, public position: Vector) {}

  public transform: Vector;

  public destroy() {
    this.manager.destroy(this);
  }

  public addComponent(C: typeof Component, params?: any) {
    const component = new C(this, { ...C.defaultParams, ...params });

    this.components.push(component);

    return component;
  }

  public getComponent(C: typeof Component) {
    for (const component of this.components) {
      if (component instanceof C) {
        return component;
      }
    }
    throw new Error(`Component ${C.name} not found on Entity ${this.constructor.name}`);
  }

  public update(dt: number) {
    for (const component of this.components) {
      component.update && component.update(dt);
    }
  }

  public init() {
    for (const component of this.components) {
      component.init && component.init();
    }
  }
}
