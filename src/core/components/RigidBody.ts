import { Component } from "../Component";

export interface RigidBodyParams {
  mass: number;
  gravityForce: number;
}

export class RigidBody extends Component {
  public mass: number;
  public gravityForce: number;

  constructor(params: RigidBodyParams) {
    super(params);

    const { gravityForce, mass } = params;

    this.mass = mass;
    this.gravityForce = gravityForce;
  }

  public update(dt: number) {
    this.entity.velocity.y += this.gravityForce * this.mass * dt;
    this.entity.position.y += this.entity.velocity.y * dt;
  }
}
