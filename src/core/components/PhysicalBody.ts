import Vector from "../../utils/Vector";
import Component from "../Component";
import GameObject from "../GameObject";

class PhysicalBody extends Component {
  public mass: number;
  public gravityForce: number;
  public position: Vector;
  public velocity: Vector;

  // public angularVelocity: number;
  // public centerOfMass: number;

  constructor(name: string, gameObject: GameObject) {
    super(name, gameObject);

    this.mass = 1;
    this.gravityForce = 10;
    this.position = new Vector();
    this.velocity = new Vector();
  }
}

export default PhysicalBody;
