import { Component } from "./Component";
import { Entity } from "./Entity";
import { Utils } from "./Utils";

export class Query {
  public entities: Entity[] = [];

  private _key: string;

  public get key(): string {
    if (this._key) {
      return this._key;
    }
    return (this._key = Utils.generateKey(this.components));
  }

  constructor(public components: typeof Component[] = []) {}

  public addEntity(entity: Entity): void {
    if (!this.entities.includes(entity) && this.matches(entity)) this.entities.push(entity);
  }

  public matches(entity: Entity) {
    let matches = true;

    for (const cls of this.components) {
      matches = matches && entity.components.some((instance) => instance instanceof cls);
      if (!matches) return false;
    }

    return matches;
  }
}
