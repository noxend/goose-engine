import Entity from "./Entity";
import Component from "./Component";
import Transform from "./components/Transform";

export default class GameObject extends Entity {
  public components: Array<Component> = [];
  public parent: GameObject | null = null;

  constructor(public name: string, components: Array<typeof Component> = []) {
    super(name);

    for (const component of components) {
      const instance = new component(name, this);
      this.components.push(instance);
    }
  }

  public addComponent(component: typeof Component) {
    const instance = new component(this.name, this);
    this.components.push(instance);
    return instance;
  }

  public getComponent(component: typeof Component) {
    return this.components.filter((c) => c instanceof component);
  }

  public setParent(gameObject: GameObject) {
    this.parent = gameObject;
  }

  public static find(name: string) {
    const [{ obj }] = this._entities.filter(
      (entity) => entity.name === name && entity.obj instanceof GameObject
    );

    return obj as GameObject;
  }
}
