import { Entity } from "./Entity";
import { EntityManager } from "./EntityManager";

export class World {
  public entityManager = new EntityManager(this);

  public update(dt: number): void {}

  public draw(ctx: CanvasRenderingContext2D) {}

  public add(entity: Entity): void {
    this.entityManager.add(entity);
  }

  public remove(entity: Entity): void {}
}
