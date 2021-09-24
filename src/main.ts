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

const ctx = canvas.getContext("2d")!;
ctx.imageSmoothingEnabled = false;

addEventListener("resize", () => {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
  ctx.imageSmoothingEnabled = false;
});

const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const fpsDebug = createElement("fps", "text");

const main = async () => {
  const level = await loadLevel();
  const player = await initPlayer();

  const camera = new Entity("camera", new Vector());
  const cameraComponent = new Camera({
    viewport: new Vector(canvas.width, canvas.height),
    target: player,
    smoothSpeed: 4,
  });

  camera.addComponent(cameraComponent);

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
    entityManager.draw(ctx);

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
};

main();
