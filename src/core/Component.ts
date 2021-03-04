import { Entity } from './Entity'

export class Component {
  constructor(public entity: Entity) {}

  init() {}
  update() {}
}
