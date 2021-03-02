import Vector from "../utils/Vector";

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

abstract class Input {
  private static readonly keyboardKeys = new Map<KeyboardKey, KeyboardEvent>();
  public static readonly mousePosition = new Vector();

  public static _initialize() {
    addEventListener("keydown", (e) => {
      Input.keyboardKeys.set(Input.transformKeyName(e.key), e);
    });

    addEventListener("keyup", (e) => {
      Input.keyboardKeys.delete(Input.transformKeyName(e.key));
    });

    addEventListener("mousemove", (e) => {
      Input.mousePosition.set(e.clientX, e.clientY);
    });

    return Input;
  }

  public static getAxis(axis: Axis) {
    if (axis === Axis.HORIZONTAL) {
      if (
        Input.isKeyPressed(KeyboardKey.ARROW_RIGHT) ||
        Input.isKeyPressed(KeyboardKey.D)
      )
        return 1;
      if (
        Input.isKeyPressed(KeyboardKey.ARROW_LEFT) ||
        Input.isKeyPressed(KeyboardKey.A)
      )
        return -1;
    }

    if (axis === Axis.VERTICAL) {
      if (
        Input.isKeyPressed(KeyboardKey.ARROW_DOWN) ||
        Input.isKeyPressed(KeyboardKey.S)
      )
        return 1;
      if (
        Input.isKeyPressed(KeyboardKey.ARROW_UP) ||
        Input.isKeyPressed(KeyboardKey.W)
      )
        return -1;
    }

    return 0;
  }

  public static isKeyPressed = (key: KeyboardKey) =>
    Input.keyboardKeys.has(key);

  private static transformKeyName = (key: string) =>
    key.toLocaleLowerCase() as KeyboardKey;
}

export default Input._initialize();
