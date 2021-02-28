interface Entity {
  update?(deltaTime: number): void;
}

abstract class Entity implements Entity {
  public static _entities: Array<{ name: string; instance: Entity }> = [];

  constructor(public name: string) {
    Entity._entities.push({ name, instance: this });
  }

  public destroy() {
    Entity.destroy(this);
  }

  public static destroy(entity: Entity) {
    Entity._entities = Entity._entities.filter(
      ({ name }) => name !== entity.name
    );
  }

  public static update(dt: number) {
    for (const { instance } of Entity._entities) {
      if (!instance.update) continue;
      instance.update(dt);
    }
  }
}

export default Entity;
