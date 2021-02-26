import Vector from "../../utils/Vector";
import GameObject from "../GameObject";
import Component from "../Component";

class Transform extends Component {
  public position: Vector;

  constructor(name: string, gameObject: GameObject) {
    super(name, gameObject);

    this.position = new Vector();
  }

  // setPosition(vector: Vector)
  setPosition(x: number, y: number) {
    this.position.set(x, y);
  }
}

export default Transform;
