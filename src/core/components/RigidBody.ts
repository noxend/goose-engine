import Vector from "../../utils/Vector";
import { Component } from "../Component";
import { Collision } from "./Collision";

export class RigidBody extends Component {
  public mass: number;
  public gravityForce: number;
  // public velocity: Vector;

  private collision: Collision;

  public update(dt: number) {
    this.entity.velocity.y += (this.gravityForce / this.mass) * dt;
    this.entity.position.y += this.entity.velocity.y;
  }
}

// RigidBody.defaultParams = {
//   velocity: new Vector(0, 0),
//   gravityForce: 10,
//   mass: 1,
// };
