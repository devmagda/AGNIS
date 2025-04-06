import Vector2D from "../modules/math/vectors/Vector2D";
import {Drawable} from "../modules/mvc/View";
import {ModelEntity} from "../modules/mvc/Model";
import BehaviourComponent from "./components/BehaviourComponent";
import {MovementComponent} from "./components/movement/MovementComponent";
import {WrappedMovementComponent} from "./components/movement/WrappedMovementComponent";
import {EntityRenderer} from "../modules/drawing/EntityRenderer";
import {StatsComponent} from "./components/StatsComponent";
import {Stat} from "../modules/stats/Stat";

export default class Entity extends ModelEntity implements Drawable {
    protected _movementComponent: MovementComponent;
    protected _behaviourComponent: BehaviourComponent;
    protected _statsComponent: StatsComponent;
    protected aliveStat: Stat;
    constructor(id: string, spawnLocation: Vector2D, maxSpeed: number, aliveStat: Stat) {
        super(id);
        this._movementComponent = new WrappedMovementComponent(spawnLocation, maxSpeed);
        this._behaviourComponent = new BehaviourComponent();
        this._statsComponent = new StatsComponent();
        this.aliveStat = aliveStat;
        this._statsComponent.statsManager.addStat(aliveStat);
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
        this._statsComponent.update(deltaTime);
        this._movementComponent.update(deltaTime);
    }

    get isAlive() {
        return !this.aliveStat.isEmpty();
    }
}