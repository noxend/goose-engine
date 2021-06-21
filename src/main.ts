// import "./sandbox";

import { EntityManager } from "@/core/EntityManager";

import initPlayer from "@/demo/entities/player";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;

canvas.height = innerHeight;
canvas.width = innerWidth;

addEventListener("resize", () => {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
  window.ctx.imageSmoothingEnabled = false;
});

window.ctx = canvas.getContext("2d")!;
window.ctx.imageSmoothingEnabled = false;

const clear = () => {
  window.ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const main = async () => {
  const player = await initPlayer();

  const entityManager = new EntityManager([player]);

  entityManager.init();

  let deltaTime = 0;
  let lastUpdate = 0;

  const loop = (currentTime: number) => {
    clear();

    deltaTime = currentTime - lastUpdate;
    lastUpdate = currentTime;

    entityManager.update(deltaTime / 1000);

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
};

main();
