import { Entity } from './Entity'

export class Component {
  constructor(public parentEntity: Entity) {}

  init() {}
  update() {}
}
