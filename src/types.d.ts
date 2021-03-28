interface Window {
  ctx: CanvasRenderingContext2D;
}

declare module "*.png" {
  const value: any;
  export default value;
}
