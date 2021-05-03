export const createElement = (name: string, value?: string) => {
  const debugPanel = document.querySelector(".debug")!;
  const node = document.createElement("span");
  node.id = name;
  node.textContent = value || "";
  return debugPanel.appendChild(node);
};

export const range = (from: number, to: number, step = 1) =>
  Array.from({ length: (to - from) / step + 1 }, (_, i) => from + i * step);
