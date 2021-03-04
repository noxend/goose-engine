import { Entity } from './Entity'
import { Component } from './Component'

export class EntityManager {
  public entities: Entity[] = []

  public add(entity: Entity) {
    entity.manager = this
    this.entities.push(entity)
  }

  public destroy(entity: Entity) {
    this.entities = this.entities.filter((e) => e.name !== entity.name)
  }

  public update() {
    for (const entity of this.entities) {
      entity.update()
    }
  }
}
