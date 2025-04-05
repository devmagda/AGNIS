import Vector2D from "../modules/math/vectors/Vector2D";
import {Drawable} from "../modules/mvc/View";
import {ModelEntity} from "../modules/mvc/Model";
import BehaviourComponent from "./components/BehaviourComponent";
import {MovementComponent} from "./components/movement/MovementComponent";
import {WrappedMovementComponent} from "./components/movement/WrappedMovementComponent";
import {EntityRenderer} from "../modules/drawing/EntityRenderer";

export default class Entity extends ModelEntity implements Drawable {
    _movementComponent: MovementComponent;
    _behaviourComponent: BehaviourComponent;
    constructor(id: string, spawnLocation: Vector2D, maxSpeed: number = 0.05 + Math.random() * 0.1) {
        super(id);
        this._movementComponent = new WrappedMovementComponent(spawnLocation, maxSpeed);
        this._behaviourComponent = new BehaviourComponent();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const radius = 30;
        if(this._movementComponent instanceof WrappedMovementComponent) {
            this._movementComponent.getWrappedPositions(radius).forEach((position: Vector2D) => {
                EntityRenderer.drawEntity(ctx, position, this._movementComponent.orientation, radius);
            });
        } else {
            EntityRenderer.drawEntity(ctx, this._movementComponent.location, this._movementComponent.orientation, radius);
        }
    }

    get behaviourComponent() {
        return this._behaviourComponent;
    }

    get movementComponent() {
        return this._movementComponent;
    }

    update(deltaTime: number) {
        this._behaviourComponent.apply(this);
        this._movementComponent.update(deltaTime);
    }
}