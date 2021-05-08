import Input, { Axis, KeyboardKey } from "./core/Input";
import Vector from "./utils/Vector";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;

canvas.height = innerHeight;
canvas.width = innerWidth;

const context = canvas.getContext("2d")!;

class Rectangle {
  oldPosition: Vector;
  velocity = new Vector();

  constructor(
    public position: Vector,
    public size = new Vector(100, 100),
    public color = "#ff0000",
    public active = false
  ) {
    this.oldPosition = this.position;
  }

  get top() {
    return this.position.x;
  }

  get right() {
    return this.position.y + this.size.y;
  }

  get bottom() {
    return this.position.x + this.size.x;
  }

  get left() {
    return this.position.y;
  }

  fixedUpdate() {}

  collisionCheck = (rev2: Rectangle) => {
    return (
      this.top < rev2.bottom &&
      this.right > rev2.left &&
      this.bottom > rev2.top &&
      this.left < rev2.right
    );
  };

  draw() {
    context.save();
    context.beginPath();
    context.translate(this.position.x, this.position.y);
    context.rect(0, 0, this.size.x, this.size.y);
    context.fillStyle = this.color;
    context.fill();
    context.restore();
  }

  controls() {
    this.velocity.x = Input.getAxis(Axis.HORIZONTAL) * 10;
    this.velocity.y += 1;

    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];
      if (this === object) continue;

      if (this.collisionCheck(object)) {
        this.velocity.y = 0;
        this.position.y = object.position.y - this.size.y ;
      }
    }

    if (this.velocity.y === 0 && Input.isKeyPressed(KeyboardKey.SPACE)) {
      this.velocity.y = -30;
    }
  }

  update() {
    this.oldPosition.x = this.position.x;
    this.oldPosition.y = this.position.y;

    this.active && this.controls();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.draw();
  }
}

const objects = [
  ...[...Array(10)].map((_, i) => new Rectangle(new Vector(100 * i, 600))),
  ...[...Array(10)].map((_, i) => new Rectangle(new Vector(100 * i, 700))),
];

const player = new Rectangle(
  new Vector(200, 200),
  new Vector(100, 100),
  "blue",
  true
);

objects.push(player);

const clear = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const loop = () => {
  clear();

  for (let i = 0; i < objects.length; i++) {
    const object = objects[i];

    object.update();
  }

  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
