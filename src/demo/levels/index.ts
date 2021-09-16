import { Entity } from "@/core/Entity";
import Vector from "@/utils/Vector";

import initBrick from "../entities/brick";
import initCoin from "../entities/coin";

const level = [
  `                                      **       `,
  `                                     0112      `,
  `       **                 **                   `,
  `      0112               0112              0112`,
  `              *********            ***         `,
  `  ***     *   0=======2          0=======2     `,
  `0=====2  0==2                                  `,
];

const sprites: { [key: string]: (name: string, position: Vector) => Promise<Entity> } = {
  "=": initBrick(1),
  "0": initBrick(0),
  "1": initBrick(1),
  "2": initBrick(2),
  "*": initCoin,
};

const offset = new Vector();

const loadLevel = async () => {
  const blocks: Entity[] = [];

  for (let i = 0; i < level.length; i++) {
    for (let j = 0; j < level[i].length; j++) {
      if (level[i][j] === " ") continue;

      const name = `entity-${i}${j}`;

      const entity = sprites[level[i][j]];
      const brick = await entity(
        name,
        new Vector(j * 100 + offset.x * 100, i * 100 + offset.y * 100)
      );

      blocks.push(brick);
    }
  }

  return blocks;
};

export default loadLevel;
