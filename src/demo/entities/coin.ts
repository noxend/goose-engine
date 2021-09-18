import Vector from "@/utils/Vector";
import { Sprite, Animation } from "@/core/components";
import { Entity } from "@/core/Entity";
import { imageLoader } from "@/utils";

const initCoin = async (name: string, position: Vector): Promise<Entity> => {
  const coin = new Entity(name, position);

  coin.addComponent(
    new Sprite({
      image: await imageLoader(await (await import("@/demo/assets")).coin),
      spriteSize: new Vector(8, 8),
      size: new Vector(50, 50),
    })
  );

  coin.addComponent(
    new Animation({
      defaultAnimation: "idle",
      animations: {
        idle: {
          repeat: true,
          from: 0,
          to: 5,
        },
      },
    })
  );

  // coin.addComponent(
  //   new Collision({
  //     size: new Vector(50, 50),
  //     trigger: true,
  //     active: true,
  //   })
  // );

  // coin.addComponent(new Coin());

  return coin;
};

export default initCoin;
