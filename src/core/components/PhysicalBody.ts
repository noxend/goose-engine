import Vector from '../../utils/Vector'
import { Component } from '../Component'
import { Time } from '../Time'

type PhysicalBodySettings = {
  mass?: number
  gravityForce?: number
  position: Vector
  velocity: Vector
}

export class PhysicalBody extends Component {
  public mass = 1
  public gravityForce = 10
  public position = new Vector()
  public velocity = new Vector()

  public update() {
    this.velocity.y += this.gravityForce
    this.entity.position.y += this.velocity.y * Time.deltaTime
  }
}
