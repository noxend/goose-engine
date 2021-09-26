import { Component } from "./Component";
import { Entity } from "./Entity";
import { Utils } from "./Utils";

export class Query {
  private entities: Entity[] = [];

  private _key: string;

  public get key(): string {
    if (this._key) {
      return this._key;
    }
    return (this._key = Utils.generateKey(this.components));
  }

  constructor(public components: typeof Component[] = []) {}

  public addEntity(entity: Entity): void {
    this.entities.push(entity);
  }
}
