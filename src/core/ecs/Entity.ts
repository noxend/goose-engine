import { Component } from "./Component";

export class Entity {
  private static ID = 0;
  public id = Entity.ID++;

  public components: Component[] = [];
  public componentsToRemove: Component[] = [];

  constructor(public _name: string, components: Component[]) {}

  public get name(): string {
    return this._name;
  }

  public setName(name: string) {
    this._name = name;
  }

  public getComponent(C: typeof Component) {
    for (const component of this.components) {
      if (component instanceof C) {
        return component;
      }
    }
  }

  public addComponent(component: Component): Component {
    component.entity = this;
    this.components.push(component);
    return component;
  }

  public removeComponent?(): void;

  public removeComponentsProcessor(): void {
    while (this.componentsToRemove.length > 0) {
      const component = this.componentsToRemove.pop();

      if (component) {
        const index = this.components.indexOf(component);
        this.components.splice(index, 1);
      }
    }
  }
}
