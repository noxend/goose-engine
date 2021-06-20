import Vector from "../utils/Vector";
import { Component } from "./Component";
import { ComponentManager } from "./ComponentManager";
import { Entity } from "./Entity";

export class EntityManager {
  public entities: Entity[] = [];
  public entitiesByName: Map<string, Entity>;
  public componentManager: ComponentManager;
  public entitiesToDestroy: Entity[] = [];

  constructor() {
    this.componentManager = new ComponentManager();
    this.entitiesByName = new Map();
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

  public addComponentToEntity(entity: Entity, C: typeof Component, params?: any): Component {
    return this.componentManager.register(entity, C, params);
  }

  public update(dt: number) {
    while (this.entitiesToDestroy.length > 0) {
      const entity = this.entitiesToDestroy.pop();
      this.componentManager.components = this.componentManager.components.filter(
        (c) => c.entity !== entity
      );
    }

    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      entity.oldPosition.x = entity.position.x;
      entity.oldPosition.y = entity.position.y;
      this.entities[i].update(dt);
    }
  }

  public init() {
    this.componentManager.init();
    this.entities.reverse();
  }
}
