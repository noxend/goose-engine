import { Animation } from "@/core/components/Animation";
import { Sprite } from "@/core/components/Sprite";
import { Entity } from "@/core/Entity";

import Vector from "@/utils/Vector";

const getPlayer = async (): Promise<Entity> => {
  const player = new Entity("player", new Vector());

  player.addComponent(Sprite, { spriteSize: new Vector(16, 16) });

  player.addComponent(Animation, {
    default: "idle",
    animations: {
      idle: {
        repeat: true,
        from: 40,
        to: 43,
      },
      run: {
        repeat: true,
        from: 8,
        to: 13,
      },
    },
  });

  return player;
};

export default getPlayer;
