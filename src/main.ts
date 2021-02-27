import GameObject from "./core/GameObject";
import Transform from "./core/components/Transform";
import PhysicalBody from "./core/components/PhysicalBody";
import Component from "./core/Component";

class PlayerController extends Component {}

const player = new GameObject("Player", [
  PlayerController,
  PhysicalBody,
  Transform,
]);

const player2 = new GameObject("Player2", [Transform]);
