import Vector2D from "../modules/math/vectors/Vector2D";
import {Drawable, ViewCanvas} from "../modules/mvc/View";
import {ModelEntity} from "../modules/mvc/Model";
import {Colors} from "../constants";
import BehaviourComponent from "./components/BehaviourComponent";
import {MovementComponent} from "./components/movement/MovementComponent";
import {WrappedMovementComponent} from "./components/movement/WrappedMovementComponent";
import VectorUtil from "../modules/math/vectors/VectorUtil";
import {BouncedMovementComponent} from "./components/movement/BouncedMovementComponent";
import {EntityRenderer} from "../modules/drawing/EntityRenderer";

export default class Entity extends ModelEntity implements Drawable {
    _movementComponent: MovementComponent;
    _behaviourComponent: BehaviourComponent;
    constructor(id: number, spawnLocation: Vector2D, maxSpeed: number = 0.1 + Math.random() * 2) {
        super(id);
        this._movementComponent = new WrappedMovementComponent(spawnLocation, maxSpeed, VectorUtil.zero(), new Vector2D(ViewCanvas.canvasSize, ViewCanvas.canvasSize));
        this._behaviourComponent = new BehaviourComponent();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const radius = 30;
        if(this._movementComponent instanceof WrappedMovementComponent) {
            this._movementComponent.getWrappedPositions().forEach((position: Vector2D) => {
                EntityRenderer.drawEntity(ctx, position, this._movementComponent.orientation, radius);
            });
        } else {
            EntityRenderer.drawEntity(ctx, this._movementComponent.location, this._movementComponent.orientation, radius);
        }
    }

    get movementComponent() {
        return this._movementComponent;
    }

    update() {
        this._behaviourComponent.apply(this);
        this._movementComponent.update();
    }
}