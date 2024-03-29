import Vector from "@/utils/Vector";
import { Animation, Sprite, AudioManager, Collision, RigidBody } from "@/core/components";
import { Entity } from "@/core/Entity";
import { imageLoader } from "@/utils";

import { PlayerController } from "../components/PlayerController";

const getPlayer = async (): Promise<Entity> => {
  const player = new Entity("player", new Vector(100, 100));

  player.addComponent(
    new Sprite({
      image: await imageLoader(await (await import("@/demo/assets")).hero),
      spriteSize: new Vector(16, 16),
      size: new Vector(100, 100),
    })
  );

  player.addComponent(new RigidBody({ gravityForce: 5, mass: 1 }));

  player.addComponent(new Collision({ center: new Vector(), size: new Vector(100, 100) }));

  player.addComponent(
    new Animation({
      defaultAnimation: "idle",
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
    })
  );

  player.addComponent(
    new AudioManager({
      sources: {
        jump: {
          src: await (await import("@/demo/assets")).jumpWav,
          volume: 0.4,
        },
        coin: {
          src: await (await import("@/demo/assets")).pickupWav,
          volume: 0.4,
        },
      },
    })
  );

  player.addComponent(new PlayerController({ speed: 400 }));

  return player;
};

export default getPlayer;
