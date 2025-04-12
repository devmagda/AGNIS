import Vector2D from "../modules/math/vectors/Vector2D";
import {Drawable} from "../modules/mvc/View";
import {ModelEntity} from "../modules/mvc/Model";
import BehaviourComponent from "./components/BehaviourComponent";
import {MovementComponent} from "./components/movement/MovementComponent";
import {WrappedMovementComponent} from "./components/movement/WrappedMovementComponent";
import {EntityRenderer} from "../modules/drawing/EntityRenderer";
import {StatsComponent} from "./components/StatsComponent";
import {Stat} from "../modules/stats/Stat";
import {IDGen} from "../modules/math/IdGen";

export default abstract class Entity extends ModelEntity implements Drawable {
    protected _statsComponent: StatsComponent;
    protected aliveStat: Stat;

    id = 'entity';

    protected constructor(spawnLocation: Vector2D, maxSpeed: number, aliveStat: Stat) {
        super();
        this._movementComponent = new WrappedMovementComponent(spawnLocation, maxSpeed);
        this._behaviourComponent = new BehaviourComponent();
        this._statsComponent = new StatsComponent();
        this.aliveStat = aliveStat;
        this._statsComponent.statsManager.addStat(aliveStat);
        this.uuid = IDGen.getId(this.id);
    }

    protected _movementComponent: MovementComponent;

    get movementComponent() {
        return this._movementComponent;
    }

    protected _behaviourComponent: BehaviourComponent;

    get behaviourComponent() {
        return this._behaviourComponent;
    }

    get isAlive() {
        return !this.aliveStat.isEmpty();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const radius = 30;
        if (this._movementComponent instanceof WrappedMovementComponent) {
            this._movementComponent.getWrappedPositions(radius).forEach((position: Vector2D) => {

                EntityRenderer.drawEntity(ctx, position, this._movementComponent.orientation, radius, this._statsComponent);
            });
        } else {
            EntityRenderer.drawEntity(ctx, this._movementComponent.location, this._movementComponent.orientation, radius, this._statsComponent);
        }
    }

    update(deltaTime: number) {
        this._behaviourComponent.apply(this);
        this._statsComponent.update(deltaTime);
        this._movementComponent.update(deltaTime);
    }

    readonly uuid: string;
}