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
import {MovementSpeed, Size} from "./stats/StatLib";

export default abstract class Entity extends ModelEntity implements Drawable {
    protected _statsComponent: StatsComponent;
    public aliveStat: Stat;
    public sizeStat: Size;
    public movementSpeed: MovementSpeed;

    id = 'entity';



    protected constructor(spawnLocation: Vector2D, maxSpeed: number, aliveStat: Stat) {
        super();
        this.sizeStat = new Size();
        this.movementSpeed = new MovementSpeed(this.sizeStat);
        this._movementComponent = new WrappedMovementComponent(spawnLocation, this.movementSpeed);
        this._behaviourComponent = new BehaviourComponent();
        this._statsComponent = new StatsComponent();
        this.aliveStat = aliveStat;
        this._statsComponent.statsManager.addStat(aliveStat);


        this._statsComponent.statsManager.addStat(this.sizeStat);
        this._statsComponent.statsManager.addStat(this.movementSpeed);
        this.uuid = IDGen.getId(this.id);
    }

    protected _movementComponent: MovementComponent;

    get movementComponent(): MovementComponent {
        return this._movementComponent;
    }

    protected _behaviourComponent: BehaviourComponent;

    get behaviourComponent() {
        return this._behaviourComponent;
    }

    get statComponent() {
        return this._statsComponent;
    }

    get isAlive() {
        return !this.aliveStat.isEmpty();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const size = this.sizeStat.value;
        if(this._movementComponent instanceof WrappedMovementComponent) {
            const positions = this._movementComponent.getWrappedPositions(size);
            positions.forEach((position) => {
                EntityRenderer.drawEntity(ctx, this, position);
            })
        }
        EntityRenderer.drawEntity(ctx, this);
    }

    update(deltaTime: number) {
        this._behaviourComponent.apply(this);
        this._statsComponent.update(deltaTime);
        this._movementComponent.update(deltaTime);
    }

    readonly uuid: string;
}