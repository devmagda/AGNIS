import MovementComponent from "./components/MovementComponent";
import Vector2D from "../modules/math/vectors/Vector2D";
import {Drawable} from "../modules/mvc/View";
import {ModelEntity} from "../modules/mvc/Model";

export default class Entity extends ModelEntity implements Drawable {
    _movementComponent: MovementComponent;
    constructor(id: number, spawnLocation: Vector2D, maxSpeed: number) {
        super(id);
        this._movementComponent = new MovementComponent(spawnLocation, maxSpeed);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this._movementComponent.location.x, this._movementComponent.location.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#ff0000"; // Example color
        ctx.fill();
        ctx.closePath();
    }


    get movementComponent() {
        return this._movementComponent;
    }
}