import Vector from "@/utils/Vector";
import { Collision, Sprite } from "@/core/components";
import { Entity } from "@/core/Entity";
import { imageLoader } from "@/utils";

const initBrick =
  (sprite: number) =>
  async (name: string, position: Vector): Promise<Entity> => {
    const block = new Entity(name, position);

    block.addComponent(
      new Sprite({
        image: await imageLoader(await (await import("@/demo/assets")).tileset),
        spriteSize: new Vector(16, 16),
        size: new Vector(100, 100),
        sprite,
      })
    );

    // block.addComponent(
    //   new Collision({
    //     static: true,
    //   })
    // );

    return block;
  };

export default initBrick;
