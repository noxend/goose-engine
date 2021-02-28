import Vector from "../../utils/Vector";
import Component from "../Component";
import GameObject from "../GameObject";

class Collision extends Component {
  public size: Vector;
  public center: Vector;

  constructor(name: string, gameObject: GameObject) {
    super(name, gameObject);

    this.size = new Vector();
    this.center = new Vector();
  }
}

export default Collision;
