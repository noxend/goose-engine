import Vector from '../../utils/Vector'
import { Component } from '../Component'

export class Transform extends Component {
  public position: Vector

  public init() {
    this.position = new Vector()
  }
}
