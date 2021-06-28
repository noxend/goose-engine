import Vector from "@/utils/Vector";
import { Collision, Sprite } from "@/core/components";
import { Entity } from "@/core/Entity";
import { imageLoader } from "@/utils";

const initBrick =
  (sprite: number) =>
  async (name: string, position: Vector): Promise<Entity> => {
    const block = new Entity(name, position);

    block.addComponent(Sprite, {
      image: await imageLoader(await (await import("@/demo/assets")).tileset),
      spriteSize: new Vector(16, 16),
      sprite,
    });

    block.addComponent(Collision, {
      static: true,
    });

    return block;
  };

export default initBrick;
