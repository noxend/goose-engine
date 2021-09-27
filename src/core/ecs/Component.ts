import { Entity } from "./Entity";

export abstract class Component {
  entity: Entity;
  onAdd?(owner: Entity): void;
  onRemove?(previousOwner: Entity): void;
}
