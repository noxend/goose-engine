import Entity from "./Entity";
import Component from "./Component";
import Transform from "./components/Transform";
import Input, { Axis } from "./Input";

export default class GameObject extends Entity {
  public components: Array<Component> = [];
  public parent: GameObject | null = null;
  public transform: Transform;

  constructor(public name: string, components: Array<typeof Component> = []) {
    super(name);

    for (const component of components) {
      const instance = new component(name, this);
      this.components.push(instance);
    }

    this.transform = this.getComponent(Transform) as Transform;
    this.transform.position.set(innerWidth / 2, innerHeight / 2);
  }

  public addComponent(component: typeof Component) {
    const instance = new component(this.name, this);
    this.components.push(instance);
    return instance;
  }

  public getComponent(component: typeof Component) {
    return this.components.filter((c) => c instanceof component)[0];
  }

  public setParent(gameObject: GameObject) {
    this.parent = gameObject;
  }

  public static find(name: string) {
    const [{ instance }] = this._entities.filter(
      (entity) => entity.name === name && entity.instance instanceof GameObject
    );

    return instance as GameObject;
  }

  public update(dt: number) {
    const directionX = Input.getAxis(Axis.HORIZONTAL);
    const directionY = Input.getAxis(Axis.VERTICAL);

    if (directionX) {
      this.transform.position.x += 500 * directionX * dt;
    }

    if (directionY) {
      this.transform.position.y += 500 * directionY * dt;
    }

    window.ctx.save();
    window.ctx.beginPath();
    window.ctx.translate(
      this.transform.position.x - 100 / 2,
      this.transform.position.y - 100 / 2
    );
    window.ctx.rect(0, 0, 100, 100); //
    window.ctx.fillStyle = "#27ae60";
    window.ctx.fill();
    window.ctx.restore();
  }
}
