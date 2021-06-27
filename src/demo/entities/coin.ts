import { Sprite, Animation, Collision } from "@/core/components";
import { Entity } from "@/core/Entity";
import { imageLoader } from "@/utils";
import Vector from "@/utils/Vector";

import { Coin } from "../scripts/Coin";

const initCoin = async (name: string, position: Vector): Promise<Entity> => {
  const coin = new Entity(name, position);

  coin.addComponent(Sprite, {
    spriteSize: new Vector(8, 8),
    size: new Vector(50, 50),
    image: await imageLoader(await (await import("@/demo/assets")).coin),
  });

  coin.addComponent(Animation, {
    default: "idle",
    animations: {
      idle: {
        from: 0,
        to: 5,
        repeat: true,
      },
    },
  });

  coin.addComponent(Collision, {
    size: new Vector(50, 50),
    trigger: true,
    active: true,
  });

  coin.addComponent(Coin);

  return coin;
};

export default initCoin;
