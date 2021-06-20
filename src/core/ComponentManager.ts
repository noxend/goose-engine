import Vector from "../utils/Vector";
import { Component } from "./Component";
import { Entity } from "./Entity";

export class ComponentManager {
  public components: Component[] = [];
  public registeredComponents: Array<{
    C: typeof Component;
    entity: Entity;
    params: any;
  }> = [];

  public register(entity: Entity, C: typeof Component, params?: any): Component {
    const component = new C(entity, { ...C.defaultParams, ...params });
    component.componentManager = this;
    this.components.push(component);
    entity.components.set(C, component);
    return component;
  }

  public filterByType(C: typeof Component) {
    return this.components.filter((c) => c instanceof C);
  }

  public update(dt: number) {
    for (const component of this.components) {
      component.update(dt);
    }
  }

  public init() {
    for (let i = 0; i < this.components.length; i++) {
      this.components[i].init();
    }
  }
}
