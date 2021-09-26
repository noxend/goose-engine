import { System } from "./System";
import { World } from "./World";

export class SystemManager {
  public systems: System[] = [];

  constructor(public world: World) {}

  public add(system: System): void {
    this.systems.push(system);
    this.systems.sort((a, b) => a.priority - b.priority);
    this.world.queryManager.createQuery(system.components);
  }

  public remove(system: System): void {}

  public update(dt: number): void {
    for (const system of this.systems) {
      system.update([], dt);
    }
  }
}
