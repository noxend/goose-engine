import { Component } from "./Component";
import { Entity } from "./Entity";

export class ComponentManager {
  public components: Component[] = [];
  public componentsToDestroy: Component[] = [];
  public nextComponentId = 0;

  public register(entity: Entity, C: typeof Component, params?: any) {
    const component = new C(entity, this, params);
    component.ID = this.nextComponentId++;
    entity.components.set(C, component);
    this.components.push(component);
  }

  public filterByType(C: typeof Component) {
    return this.components.filter((c) => c instanceof C);
  }

  public update() {
    for (const component of this.components) {
      component.update();
    }
  }

  public init() {
    for (const component of this.components) {
      component.init();
    }
  }
}
