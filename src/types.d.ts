interface Window {
  ctx: CanvasRenderingContext2D;
}

declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.wav" {
  const value: any;
  export default value;
}

declare module "*.mp3" {
  const value: any;
  export default value;
}
