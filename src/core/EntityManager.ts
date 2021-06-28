import Vector from "../utils/Vector";
import { Component } from "./Component";
import { ComponentManager } from "./ComponentManager";
import { Entity } from "./Entity";

export class EntityManager {
  public entities: Entity[] = [];
  public entitiesByName: Map<string, Entity>;
  public componentManager: ComponentManager;
  public entitiesToDestroy: Entity[] = [];

  constructor(entities: Entity[] = []) {
    this.componentManager = new ComponentManager();
    this.entitiesByName = new Map();

    for (const entity of entities) {
      entity.manager = this;
      this.entities.push(entity);
      this.entitiesByName.set(entity.name, entity);

      entity.components.forEach((component) => this.componentManager.register(component));
    }
  }

  public add(entity: Entity): void {
    this.entitiesByName.set(entity.name, entity);
    this.entities.push(entity);
  }

  public create(name: string, position: Vector): Entity {
    if (this.entitiesByName.has(name)) {
      console.warn(`Entity name '${name}' already exist`);
    }

    const entity = new Entity(name, position);

    entity.manager = this;

    this.entitiesByName.set(name, entity);
    this.entities.push(entity);

    return entity;
  }

  public destroy(entity: Entity) {
    this.entitiesToDestroy.push(entity);
  }

  // public addComponentToEntity(entity: Entity, C: typeof Component, params?: any): Component {
  //   return this.componentManager.register(entity, C, params);
  // }

  public update(dt: number) {
    while (this.entitiesToDestroy.length > 0) {
      const entity = this.entitiesToDestroy.pop()!;

      const index = this.entities.indexOf(entity);
      this.entities.splice(index, 1);

      this.componentManager.components = this.componentManager.components.filter(
        (c) => c.entity !== entity
      );
    }

    for (const entity of this.entities) {
      entity.oldPosition.x = entity.position.x;
      entity.oldPosition.y = entity.position.y;
      entity.update(dt);
    }
  }

  public init() {
    for (const entity of this.entities) {
      entity.init();
    }
  }
}
