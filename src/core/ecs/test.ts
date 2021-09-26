import { Entity } from "./Entity";
import { Component } from "./Component";
import { World } from "./World";
import { System } from "./System";

class Transform extends Component {}
class BoxCollider extends Component {}

class TestSystem extends System {
  public components = [Transform, BoxCollider];
  public update() {}
}

const system = new TestSystem();
const entity = new Entity("entity");

entity.addComponent(new Transform());
entity.addComponent(new BoxCollider());

const world = new World();

world.add(system);
world.add(entity);

console.log(world);
