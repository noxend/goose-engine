import { SystemManager } from "./SystemManager";
import { EntityManager } from "./EntityManager";
import { QueryManager } from "./QueryManager";
import { Entity } from "./Entity";
import { System } from "./System";

export class World {
  public queryManager = new QueryManager(this);
  public entityManager = new EntityManager(this);
  public systemManager = new SystemManager(this);

  public update(dt: number): void {}

  public add(entity: Entity): void;
  public add(system: System): void;
  public add(entityOrSystem: Entity | System): void {
    if (entityOrSystem instanceof Entity) {
      this.entityManager.add(entityOrSystem);
    }

    if (entityOrSystem instanceof System) {
      this.systemManager.add(entityOrSystem);
    }
  }

  public remove(entity: Entity): void;
  public remove(system: System): void;
  public remove(entityOrSystem: Entity | System): void {
    if (entityOrSystem instanceof Entity) {
      this.entityManager.remove(entityOrSystem);
    }

    if (entityOrSystem instanceof System) {
      this.systemManager.remove(entityOrSystem);
    }
  }
}
