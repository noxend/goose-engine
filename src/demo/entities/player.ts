import Vector from "@/utils/Vector";
import { Animation, Sprite, AudioManager, Collision, RigidBody } from "@/core/components";
import { Entity } from "@/core/Entity";
import { imageLoader } from "@/utils";

import { PlayerController } from "../scripts/PlayerController";

const getPlayer = async (): Promise<Entity> => {
  const player = new Entity("player", new Vector(100, 100));

  player.addComponent(Sprite, {
    image: await imageLoader(await (await import("@/demo/assets")).hero),
    spriteSize: new Vector(16, 16),
  });

  player.addComponent(Collision, { active: true });

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
      jump: {
        repeat: true,
        from: 56,
        to: 58,
      },
      landing: {
        repeat: true,
        from: 48,
        to: 50,
      },
    },
  });

  const jumpWav = await (await import("@/demo/assets")).jumpWav;
  const pickupWav = await (await import("@/demo/assets")).pickupWav;

  player.addComponent(AudioManager, {
    sources: {
      jump: {
        src: jumpWav,
        volume: 0.4,
      },
      coin: {
        src: pickupWav,
        volume: 0.4,
      },
    },
  });

  player.addComponent(PlayerController);

  return player;
};

export default getPlayer;
