// import EventEmitter from "eventemitter3";

import { Component } from '../Component'

// import Vector from "../../utils/Vector";
// import Component from "../Component";
// import GameObject from "../GameObject";
// import Transform from "./Transform";

// type Events = "onCollisionEnter" | "onCollisionOut";

// class Collision extends Component {
//   public size: Vector;
//   public center: Vector;
//   public transform: Transform;

//   public events: EventEmitter<Events>;

//   constructor(name: string, gameObject: GameObject) {
//     super(name, gameObject);

//     this.size = new Vector();
//     this.center = new Vector();
//     this.transform = this.gameObject.getComponent(Transform) as Transform;

//     this.events = new EventEmitter();

//     setInterval(() => {
//       this.events.emit("onCollisionEnter");
//     }, 3000);
//   }

//   public update() {
//     window.ctx.save();
//     window.ctx.beginPath();
//     window.ctx.translate(
//       this.transform.position.x - this.size.x / 2,
//       this.transform.position.y - this.size.y / 2
//     );
//     window.ctx.rect(this.center.x, this.center.y, this.size.x, this.size.y);
//     window.ctx.strokeStyle = "white";
//     window.ctx.stroke();
//     window.ctx.restore();
//   }
// }

// export default Collision;

export class Collider extends Component {}
