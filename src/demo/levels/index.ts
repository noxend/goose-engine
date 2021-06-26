import { Collision, Sprite } from "@/core/components";
import { Entity } from "@/core/Entity";
import { imageLoader } from "@/utils";
import Vector from "@/utils/Vector";

const level = [
  `                                         `,
  `                                         `,
  `      0112               0112            `,
  `                                         `,
  `              0======2           0======2`,
  `0=====2  0==2                            `,
];

const sprites: { [key: string]: number } = {
  "=": 1,
  "*": 3,
  "0": 0,
  "1": 1,
  "2": 2,
};

const offset = new Vector();

const loadLevel = async () => {
  const blocks: Entity[] = [];
  const tileset = await imageLoader(await (await import("@/demo/assets")).tileset);

  for (let i = 0; i < level.length; i++) {
    for (let j = 0; j < level[i].length; j++) {
      if (level[i][j] === " ") continue;

      const name = `block-${i}${j}`;

      const block = new Entity(
        name,
        new Vector(j * 100 + offset.x * 100, i * 100 + offset.y * 100)
      );

      block.addComponent(Sprite, {
        spriteSize: new Vector(16, 16),
        sprite: sprites[level[i][j]],
        image: tileset,
      });

      block.addComponent(Collision, {
        static: true,
      });

      blocks.push(block);
    }
  }

  return blocks;
};

export default loadLevel;
