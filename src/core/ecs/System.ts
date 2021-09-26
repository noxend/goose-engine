import { Component } from "./Component";
import { Entity } from "./Entity";

export abstract class System {
  public priority = 0;

  public abstract components: typeof Component[];

  public abstract update(entities: Entity[], dt: number): void;
}
