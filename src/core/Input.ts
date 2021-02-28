export enum KeyboardKey {
  SPACE = " ",
  ARROW_UP = "arrowup",
  ARROW_DOWN = "arrowdown",
  ARROW_LEFT = "arrowleft",
  ARROW_RIGHT = "arrowright",
  A = "a",
  D = "d",
  W = "w",
  S = "s",
}

export enum Axis {
  HORIZONTAL,
  VERTICAL,
}

class Input {
  private keyboardKeys: Map<KeyboardKey, KeyboardEvent>;

  constructor() {
    this.keyboardKeys = new Map<KeyboardKey, KeyboardEvent>();

    addEventListener("keydown", (e) => {
      this.keyboardKeys.set(this.transformKeyName(e.key), e);
    });

    addEventListener("keyup", (e) => {
      this.keyboardKeys.delete(this.transformKeyName(e.key));
    });
  }

  public getAxis(axis: Axis) {
    if (axis === Axis.HORIZONTAL) {
      if (
        this.isKeyPressed(KeyboardKey.ARROW_RIGHT) ||
        this.isKeyPressed(KeyboardKey.D)
      )
        return 1;
      if (
        this.isKeyPressed(KeyboardKey.ARROW_LEFT) ||
        this.isKeyPressed(KeyboardKey.A)
      )
        return -1;
    }

    if (axis === Axis.VERTICAL) {
      if (
        this.isKeyPressed(KeyboardKey.ARROW_DOWN) ||
        this.isKeyPressed(KeyboardKey.S)
      )
        return 1;
      if (
        this.isKeyPressed(KeyboardKey.ARROW_UP) ||
        this.isKeyPressed(KeyboardKey.W)
      )
        return -1;
    }

    return 0;
  }

  public isKeyPressed = (key: KeyboardKey) => this.keyboardKeys.has(key);

  private transformKeyName = (key: string) =>
    key.toLocaleLowerCase() as KeyboardKey;
}

export default new Input();
