import Entity from "./Entity";
import GameObject from "./GameObject";

export default class Component extends Entity {
  constructor(name: string, public gameObject: GameObject) {
    super(name);
  }
}
