import Vector from "@/utils/Vector";
import { Animation, Sprite, AudioManager } from "@/core/components";
import { Entity } from "@/core/Entity";
import { imageLoader } from "@/utils";

import { PlayerController } from "../scripts/PlayerController";

const getPlayer = async (): Promise<Entity> => {
  const player = new Entity("player", new Vector());

  player.addComponent(Sprite, {
    image: await imageLoader(await (await import("@/demo/assets")).hero),
    spriteSize: new Vector(16, 16),
  });

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

  player.addComponent(AudioManager, {
    sources: {
      jump: {
        src: await (await import("@/demo/assets")).jump,
        volume: 0.4,
      },
    },
  });

  player.addComponent(PlayerController);

  return player;
};

export default getPlayer;
