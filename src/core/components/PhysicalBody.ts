import Vector from '../../utils/Vector'
import { Component } from '../Component'

export class PhysicalBody extends Component {
  public mass: number
  public gravityForce: number
  public position: Vector
  public velocity: Vector

  // public angularVelocity: number;
  // public centerOfMass: number;

  public init() {
    this.mass = 1
    this.gravityForce = 10
    this.position = new Vector()
    this.velocity = new Vector()
  }
}
