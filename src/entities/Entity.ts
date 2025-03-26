import MovementComponent from "./components/MovementComponent";
import Vector2D from "../modules/math/vectors/Vector2D";
import {Drawable} from "../modules/mvc/View";
import {ModelEntity} from "../modules/mvc/Model";
import {Colors} from "../constants";

export default class Entity extends ModelEntity implements Drawable {
    _movementComponent: MovementComponent;
    constructor(id: number, spawnLocation: Vector2D, maxSpeed: number) {
        super(id);
        this._movementComponent = new MovementComponent(spawnLocation, maxSpeed);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const radius = 10;

        const { x, y } = this._movementComponent.location;
        const rotation = this._movementComponent.orientation; // Assuming rotation is a normalized Vector2D
        rotation.normalize();
        const lineEnd = new Vector2D(x + rotation.x * radius, y + rotation.y * radius);

        // Draw the circle (entity)
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = Colors.textSecondary;
        ctx.fill();
        ctx.closePath();

        // Draw the direction line
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(lineEnd.x, lineEnd.y);
        ctx.strokeStyle = Colors.borderColor; // White line
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }


    get movementComponent() {
        return this._movementComponent;
    }
}