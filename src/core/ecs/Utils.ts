import { Component } from "./Component";

export class Utils {
  static generateKey(components: typeof Component[]): string {
    return components
      .map(({ name }) => name)
      .sort((a, b) => a.localeCompare(b))
      .join("/");
  }
}
