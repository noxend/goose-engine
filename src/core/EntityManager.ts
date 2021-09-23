import Vector from "../utils/Vector";
import { ComponentManager } from "./ComponentManager";
import { Entity } from "./Entity";

export class EntityManager {
  public entities: Entity[] = [];
  public entitiesByName: Map<string, Entity>;
  public componentManager: ComponentManager;
  private entitiesToDestroy: Entity[] = [];

  constructor(entities: Entity[] = []) {
    this.componentManager = new ComponentManager();
    this.entitiesByName = new Map();

    for (const entity of entities) {
      this.registerEntity(entity);
    }
  }

  private registerEntity(entity: Entity): void {
    if (this.entitiesByName.has(entity.name)) {
      console.warn(`Entity name '${entity.name}' already exist`);
    }

    entity.manager = this;
    this.entities.push(entity);
    this.entitiesByName.set(entity.name, entity);

    for (const component of entity.components) {
      this.componentManager.add(component);
    }
  }

  private unregisterEntity(entity: Entity): void {
    const index = this.entities.indexOf(entity);
    this.entities.splice(index, 1);

    this.entitiesByName.delete(entity.name);

    this.componentManager.components = this.componentManager.components.filter(
      (c) => c.entity !== entity
    );
  }

  public add(entity: Entity): void;
  public add(entities: Entity[]): void;
  public add(entityOrEntities: Entity | Entity[]): void {
    if (Array.isArray(entityOrEntities)) {
      for (const entity of entityOrEntities) {
        this.registerEntity(entity);
      }
      return;
    }

    this.registerEntity(entityOrEntities);
  }

  public create(name: string, position: Vector): Entity {
    const entity = new Entity(name, position);
    this.registerEntity(entity);
    return entity;
  }

  public destroy(entity: Entity) {
    this.entitiesToDestroy.push(entity);
  }

  public update(dt: number) {
    while (this.entitiesToDestroy.length > 0) {
      const entity = this.entitiesToDestroy.pop()!;
      this.unregisterEntity(entity);
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
