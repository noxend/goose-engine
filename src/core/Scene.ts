import { EntityManager } from "./EntityManager";
import { Entity } from "./Entity";

export class Scene {
  private entityManager = new EntityManager();

  constructor(private _name: string) {}

  public get name() {
    return this._name;
  }

  public set setName(name: string) {
    this._name = name;
  }

  public get entities(): Entity[] {
    return this.entityManager.entities;
  }

  public addEntity(entity: Entity): void {
    this.entityManager.add(entity);
  }

  public destroyEntity(entity: Entity): void {
    this.entityManager.destroy(entity);
  }

  public update(dt: number): void {
    this.entityManager.update(dt);
  }

  public init(): void {
    this.entityManager.init();
  }
}
