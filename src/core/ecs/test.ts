import { Entity } from "./Entity";
import { Component } from "./Component";
import { World } from "./World";
import { System } from "./System";
import Vector from "@/utils/Vector";

// Components

class Transform extends Component {
  public position = Vector.zero;
}
class RigidBody extends Component {
  public mass = 10;
}

class SpriteSheet extends Component {}

// Systems
class GravitySystem extends System {
  public components = [Transform, RigidBody];

  public update(entities: Entity[], dt: number) {
    for (const entity of entities) {
      const transform = entity.getComponent(Transform) as Transform;
      const collider = entity.getComponent(RigidBody) as RigidBody;
    }
  }
}

class MotionSystem extends System {
  public components = [Transform];

  public update(entities: Entity[], dt: number) {
    for (const entity of entities) {
      const transform = entity.getComponent(Transform) as Transform;
    }
  }
}

// Entities

class Hero extends Entity {
  constructor() {
    super("tree");

    this.addComponent(new Transform());
    this.addComponent(new SpriteSheet());
    this.addComponent(new RigidBody());
  }
}

class Tree extends Entity {
  constructor() {
    super("hero");

    this.addComponent(new Transform());
  }
}

const world = new World();

world.add(new MotionSystem());
world.add(new GravitySystem());

const tree = new Tree();

world.add(new Hero());
world.add(tree);
world.add(tree);

world.update(1);

console.log(world.queryManager);
