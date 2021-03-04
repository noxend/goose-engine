import { Entity } from './Entity'
import { Component } from './Component'

export class EntityManager {
  public entities: Entity[] = []

  public add(object: typeof Entity, components?: Array<typeof Component>, name?: string) {
    const instance = new object(name || object.name, this, components)
    this.entities.push(instance)
    return instance
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
