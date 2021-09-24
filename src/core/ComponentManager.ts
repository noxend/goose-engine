import { Component } from "./Component";

export class ComponentManager {
  public components: Component[] = [];

  public add(component: Component) {
    component.componentManager = this;
    this.components.push(component);
    return component;
  }

  public filterByType(C: typeof Component) {
    return this.components.filter((c) => c instanceof C);
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
