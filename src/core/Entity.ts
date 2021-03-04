import Vector from '../utils/Vector'
import { EntityManager } from './EntityManager'
import { Component } from './Component'

export class Entity {
  public position = new Vector()
  public componentsInstances: Array<Component> = []
  public parent: Entity | null = null
  public manager: EntityManager

  constructor(public name: string, components: Array<typeof Component> = []) {
    for (const component of components) {
      this.addComponent(component)
    }

    this.init()
  }

  public addComponent(component: typeof Component): Component {
    const instance = new component(this)
    this.componentsInstances.push(instance)
    return instance
  }

  public getComponent(component: typeof Component) {
    return this.componentsInstances.filter((c) => c instanceof component)[0]
  }

  public destroy() {
    this.manager.destroy(this)
  }

  public update() {
    for (const component of this.componentsInstances) {
      component.update()
    }
  }

  public setParent(entity: Entity) {
    if (this !== entity) {
      this.parent = entity
    }
  }

  public init() {
    for (const component of this.componentsInstances) {
      component.init()
    }
  }
}
