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

  public create(name: string, position: Vector) {
    const entity = new Entity(name, this, position);
    this.entities.push(entity);

    if (this.entitiesByName.has(name)) {
      console.warn(`Entity name '${name}' already exist`);
    } else {
      this.entitiesByName.set(name, entity);
    }

    return entity;
  }

  public destroy(entity: Entity) {
    this.entitiesToDestroy.push(entity);
  }

  public addComponentToEntity(
    entity: Entity,
    C: typeof Component,
    params?: any
  ) {
    this.componentManager.register(entity, C, params);
  }

  public update(dt: number) {
    while (this.entitiesToDestroy.length > 0) {
      const entity = this.entitiesToDestroy.pop();
      this.componentManager.components =
        this.componentManager.components.filter((c) => c.entity !== entity);
    }

    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update(dt);
    }
  }

  public init() {
    this.componentManager.init();
  }
}
