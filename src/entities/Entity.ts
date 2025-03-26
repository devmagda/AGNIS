import Vector2D from "../modules/math/vectors/Vector2D";
import {Drawable} from "../modules/mvc/View";
import {ModelEntity} from "../modules/mvc/Model";
import {Colors} from "../constants";
import BehaviourComponent from "../modules/behaviors/BehaviourComponent";
import {MovementComponent} from "./components/MovementComponent";

export default class Entity extends ModelEntity implements Drawable {
    _movementComponent: MovementComponent;
    _behaviourComponent: BehaviourComponent;
    constructor(id: number, spawnLocation: Vector2D, maxSpeed: number = 0.1 + Math.random() * 0.5) {
        super(id);
        this._movementComponent = new MovementComponent(spawnLocation, maxSpeed);
        this._behaviourComponent = new BehaviourComponent();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const radius = 30;

        const { x, y } = this._movementComponent.location;
        const rotation = this._movementComponent.orientation; // Assuming rotation is a normalized Vector2D
        rotation.normalize();
        const lineEnd = new Vector2D(x + rotation.x * radius, y + rotation.y * radius);

        // Draw the circle (entity)
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = Colors.bgHighlight;
        ctx.fill();
        ctx.closePath();

        // Draw the direction line
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(lineEnd.x, lineEnd.y);
        ctx.strokeStyle = Colors.danger; // White line
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }


    get movementComponent() {
        return this._movementComponent;
    }

    update() {
        this._behaviourComponent.apply(this);
        this._movementComponent.update();
    }
}