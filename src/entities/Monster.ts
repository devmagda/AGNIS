import Entity from "./Entity";
import Vector2D from "../modules/math/vectors/Vector2D";
import {FoodItemCount, HealthStat, HungerStat, ViewRadius} from "./stats/StatLib";
import {HealthHungerRule} from "./stats/rules/StatRuleLib";
import {Ids} from "./EntityIds";
import {GoalTree} from "../modules/goap/goals/GoalTree";
import {HungerGoal} from "./goals/HungerGoal";
import {IdleGoal} from "./goals/IdleGoal";
import {EatAction, IdleAction, WanderAction} from "./actions/ActionLib";

class Monster extends Entity {
    id = Ids.monster;
    goalManager = new GoalTree();

    constructor(spawnLocation: Vector2D) {
        super(spawnLocation, Monster.getMaxSpeed(Math.random()), new HealthStat());
        this._statsComponent.statsManager.addStat(new HungerStat());
        this._statsComponent.statsManager.statRuleManager.addRule(HealthHungerRule);

        this.goalManager.addGoalTree(new HungerGoal(this._statsComponent.statsManager, this.behaviourComponent));
        this.goalManager._actionManager.addAction(new EatAction(this._statsComponent.statsManager));
        this._statsComponent.statsManager.addStat(new FoodItemCount());

        this._statsComponent.statsManager.addStat(new ViewRadius());

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
        console.log('Execution Done ------------------------------------------');
    }
}

export {Monster};