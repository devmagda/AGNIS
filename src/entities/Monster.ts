import Entity from "./Entity";
import Vector2D from "../modules/math/vectors/Vector2D";
import {FoodItemCount, HealthStat, HungerStat, MovementSpeed, ViewRadius} from "./stats/StatLib";
import {HealthHungerRule} from "./stats/rules/StatRuleLib";
import {Ids} from "./EntityIds";
import {GoalTree} from "../modules/goap/goals/GoalTree";
import {HungerGoal} from "./goals/HungerGoal";
import {IdleGoal} from "./goals/IdleGoal";
import {EatAction, IdleAction, WanderAction} from "./actions/ActionLib";
import {WrappedMovementComponent} from "./components/movement/WrappedMovementComponent";
import {EntityRenderer} from "../modules/drawing/EntityRenderer";

class Monster extends Entity {
    id = Ids.monster;
    goalManager = new GoalTree();
    viewRadiusStat: ViewRadius;


    constructor(spawnLocation: Vector2D) {
        super(spawnLocation, Monster.getMaxSpeed(Math.random()), new HealthStat());
        this._statsComponent.statsManager.addStat(new HungerStat(this.movementSpeed));
        this._statsComponent.statsManager.statRuleManager.addRule(HealthHungerRule);

        this.goalManager.addGoalTree(new HungerGoal(this._statsComponent.statsManager, this.behaviourComponent));
        this.goalManager._actionManager.addAction(new EatAction(this._statsComponent.statsManager));
        this._statsComponent.statsManager.addStat(new FoodItemCount());

        const viewRadiusStat = new ViewRadius(this.sizeStat);
        this.viewRadiusStat = viewRadiusStat;

        console.log(viewRadiusStat);

        this._statsComponent.statsManager.addStat(viewRadiusStat);

        this.goalManager.addGoalTree(new IdleGoal(this._behaviourComponent));
        this.goalManager._actionManager.addAction(new IdleAction(this._behaviourComponent));
        this.goalManager._actionManager.addAction(new WanderAction(this._behaviourComponent));
    }

    static getMaxSpeed(value: number): number {
        return 0.05 + value * 0.1;
    }

    update(deltaTime: number) {
        super.update(deltaTime);
        const currentGoal = this.goalManager.execute();
        //console.log('Execution Done ------------------------------------------');
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const size = this.viewRadiusStat.value;
        if(this._movementComponent instanceof WrappedMovementComponent) {
            const positions = this._movementComponent.getWrappedPositions(size);
            positions.forEach((position) => {
                EntityRenderer.drawEntity(ctx, this, position);
            })
        }
        EntityRenderer.drawEntity(ctx, this);
    }
}

export {Monster};