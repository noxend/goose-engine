class Entity {
  public static _entities: Array<{ name: string; obj: Entity }> = [];

  constructor(public name: string) {
    Entity._entities.push({ name, obj: this });
  }

  public destroy() {
    Entity.destroy(this);
  }

  public static destroy(obj: Entity) {
    Entity._entities = Entity._entities.filter(({ name }) => name !== obj.name);
  }
}

export default Entity;
