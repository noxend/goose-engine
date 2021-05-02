import Vector from "../../utils/Vector";
import { Component } from "../Component";
import { Collision } from "./Collision";

export class RigidBody extends Component {
  public mass: number;
  public gravityForce: number;
  public velocity: Vector;

  private collision: Collision;

  public init() {
    this.collision = this.entity.getComponent(Collision) as Collision;
    this.collision.evens.on("onCollisionEnter", this.onCollisionEnter);
  }

  private onCollisionEnter = (collision: Collision[]) => {};

  public update(dt: number) {
    // this.velocity.y += (this.gravityForce / this.mass) * dt;
    // this.entity.position.y += this.velocity.y;
  }
}

RigidBody.defaultParams = {
  mass: 1,
  gravityForce: 10,
  velocity: new Vector(0, 0),
};
