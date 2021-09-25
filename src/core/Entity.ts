import Vector from "../utils/Vector";
import { Scene } from "./Scene";
import { Component } from "./Component";

export class Entity {
  public components: Component[] = [];
  public scene: Scene;

  public velocity = new Vector();
  public oldPosition = new Vector();
  public transform: Vector;

  constructor(public name: string, public position: Vector) {}

  public destroy() {
    this.scene.destroy(this);
  }

  public addComponent(component: Component) {
    component.entity = this;
    this.components.push(component);
    return component;
  }

  public getComponent(C: typeof Component) {
    for (const component of this.components) {
      if (component instanceof C) {
        return component;
      }
    }
  }

  public update(dt: number) {
    for (const component of this.components) {
      component.update(dt);
    }
  }

  public init() {
    for (const component of this.components) {
      component.init();
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    for (const component of this.components) {
      component.draw(ctx);
    }
  }
}
