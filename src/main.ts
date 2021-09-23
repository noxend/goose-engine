// import "./sandbox";

import { EntityManager } from "@/core/EntityManager";

import initPlayer from "@/demo/entities/player";
import loadLevel from "@/demo/levels";
import { Camera } from "./core/components";
import { createElement } from "./utils";
import { Entity } from "./core/Entity";
import Vector from "./utils/Vector";

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

const fpsDebug = createElement("fps", "text");

const main = async () => {
  const level = await loadLevel();
  const player = await initPlayer();

  const camera = new Entity("camera", new Vector());
  camera.addComponent(new Camera({ target: player, smoothSpeed: 4 }));

  const entityManager = new EntityManager([camera]);

  entityManager.add([...level]);
  entityManager.add(player);

  entityManager.init();

  let deltaTime = 0;
  let lastUpdate = 0;

  let fps = 0;

  const loop = (currentTime: number) => {
    clear();

    deltaTime = currentTime - lastUpdate;
    lastUpdate = currentTime;

    fps = Math.round(1 / (deltaTime / 1000));
    fpsDebug.textContent = `FPS: ${fps.toFixed()}`;

    entityManager.update(deltaTime / 1000);

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
};

main();
