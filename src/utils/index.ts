export const createElement = (name: string, value?: string) => {
  const debugPanel = document.querySelector(".debug")!;
  const node = document.createElement("span");
  node.id = name;
  node.textContent = value || "";
  return debugPanel.appendChild(node);
};
