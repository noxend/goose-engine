import { Entity } from "./Entity";
import { World } from "./World";

export class EntityManager {
  public entities: Entity[] = [];
  private entitiesToRemove: Entity[] = [];

  constructor(public world: World) {}

  public add(entity: Entity): void {
    this.entities.push(entity);
  }

  public remove(entity: Entity): void {
    this.entitiesToRemove.push(entity);
  }

  public removeComponentsProcessor(): void {
    for (const entity of this.entities) {
      entity.removeComponentsProcessor();
    }
  }

  public removeEntitiesProcessor(): void {
    while (this.entitiesToRemove.length > 0) {
      const entity = this.entitiesToRemove.pop();

      if (entity) {
        const index = this.entities.indexOf(entity);
        this.entities.splice(index, 1);
      }
    }
  }
}
