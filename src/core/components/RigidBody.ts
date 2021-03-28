import Vector from "../../utils/Vector";
import { Component } from "../Component";
import { Collision } from "./Collision";

const defaultParams = new Map<string, any>([
  ["mass", 1],
  ["gravityForce", 10],
  ["velocity", new Vector(0, 0)],
]);

export class RigidBody extends Component {
  public mass: number;
  public gravityForce: number;
  public velocity: Vector;

  private collision: Collision;

  private isCollision = false;

  public init() {
    defaultParams.forEach((value, key) => {
      if (!this[key]) this[key] = value;
    });

    const collision = this.entity.getComponent(Collision) as Collision;

    collision.evens.on("onCollisionEnter", this.onCollisionEnter);
  }

  private onCollisionEnter = (collision: Collision[]) => {
    if (collision.length > 0) {
      // this.entity.position.y = -100;
      this.isCollision = true;
    }
    // if (collision.length === 0) this.isCollision = false;
  };

  public update(dt: number) {
    // if (this.isCollision) {
    //   // this.velocity.set(0, 0);
    //   return;
    // }
    this.velocity.y += (this.gravityForce / this.mass) * dt;
    this.entity.position.y += this.velocity.y;
  }
}
