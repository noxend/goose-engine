import { Component } from "@/core/Component";
import { Collision } from "@/core/components";
import { PlayerController } from "./PlayerController";

export class Coin extends Component {
  private collision: Collision;

  public init() {
    this.collision = this.entity.getComponent(Collision) as Collision;
    this.collision.evens.on("onTriggerEnter", this.onTriggerEnter.bind(this));
  }

  private onTriggerEnter(collision: Collision) {
    const hero = collision.entity.getComponent(PlayerController) as PlayerController;

    if (!hero) return;

    hero.addCoin();
    this.entity.destroy();
  }
}
