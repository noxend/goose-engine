export class Vector {
  constructor(public x: number = 0, public y: number = 0) {}

  add(vector: Vector): Vector {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  sub(vector: Vector): Vector {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  normalize(): Vector {
    const m = this.magnitude();
    if (m > 0) this.divide(m);

    return this;
  }

  set(x?: number, y?: number): Vector {
    this.x = x || this.x;
    this.y = y || this.y;
    return this;
  }

  magSq = (): number => this.x * this.x + this.y * this.y;

  magnitude = (): number => Math.sqrt(this.x * this.x + this.y * this.y);

  direction = (): number => Math.atan2(this.x, this.y);

  distance = (vector: Vector): number => Vector.calculateDist(this, vector);

  copy = (): Vector => new Vector(this.x, this.y);

  public multiply(scalar: number): Vector;
  public multiply(vector: Vector): Vector;
  public multiply(scalarX: number, scalarY: number): Vector;
  public multiply(arg1: number | Vector, arg2?: number): Vector {
    if (typeof arg1 === "number" && !arg2) {
      this.x *= arg1;
      this.y *= arg1;
      return this;
    }

    if (typeof arg1 === "number" && arg2) {
      this.x *= arg1;
      this.y *= arg2;
      return this;
    }

    if (arg1 instanceof Vector) {
      this.x *= arg1.x;
      this.y *= arg1.y;
      return this;
    }

    return this;
  }

  public divide(n: number): Vector;
  public divide(vector: Vector): Vector;
  public divide(x: number, y: number): Vector;
  public divide(arg1: number | Vector, arg2?: number): Vector {
    if (typeof arg1 === "number" && arg2) {
      this.x /= arg1;
      this.y /= arg2;
      return this;
    }

    if (typeof arg1 === "number") {
      this.x /= arg1;
      this.y /= arg1;
      return this;
    }

    this.x /= arg1.x;
    this.y /= arg1.y;
    return this;
  }

  static distance = (vec1: Vector, vec2: Vector): number =>
    Vector.calculateDist(vec1, vec2);

  static sub = (vec1: Vector, vec2: Vector): Vector =>
    new Vector(vec1.x - vec2.x, vec1.y - vec2.y);

  static add = (vec1: Vector, vec2: Vector): Vector =>
    new Vector(vec1.x + vec2.x, vec1.y + vec2.y);

  static get right(): Vector {
    return new Vector(1, 0);
  }

  static get up(): Vector {
    return new Vector(0, 1);
  }

  // internal methods

  private static calculateDist = (vec1: Vector, vec2: Vector): number =>
    Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
}
