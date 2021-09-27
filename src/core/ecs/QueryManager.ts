import { Component } from "./Component";
import { Entity } from "./Entity";
import { Query } from "./Query";
import { Utils } from "./Utils";
import { World } from "./World";

export class QueryManager {
  private queries: { [key: string]: Query } = {};

  constructor(public world: World) {}

  public addEntity(entity: Entity): void {
    for (const queryKey in this.queries) {
      this.queries[queryKey].addEntity(entity);
    }
  }

  public getQuery(components: typeof Component[]) {
    const key = Utils.generateKey(components);
    return this.queries[key];
  }

  public createQuery(components: typeof Component[]) {
    const query = new Query(components);

    this.queries[Utils.generateKey(query.components)] = query;

    for (const entity of this.world.entityManager.entities) {
      query.addEntity(entity);
    }

    return query;
  }
}
