import {BaseGoal} from "../../modules/goap/goals/BaseGoal";
import {StatsManager} from "../../modules/stats/StatManager";
import {HungerStat} from "../stats/StatLib";
import BehaviorManager from "../../modules/behaviors/BehaviourManager";
import BehaviorComponent from "../components/BehaviourComponent";
import behaviourComponent from "../components/BehaviourComponent";
import {IdleGoal} from "./IdleGoal";
import Wander from "../../modules/behaviors/steering/Wander";
import {WanderAction} from "../actions/ActionLib";

class WanderGoal extends BaseGoal {
    static id = 'goal-wander';
    private readonly _behaviourComponent: BehaviorComponent;
    constructor(behaviourComponent: BehaviorComponent) {
        super(WanderGoal.id);
        this._behaviourComponent = behaviourComponent;
    }

    getPriority(): number {
        return 0.1;
    }

    isSatisfied(): boolean {
        return this._behaviourComponent.currentBehavior instanceof Wander;
    }

    getRelevantActions(): string[] {
        return [
            WanderAction.id,
        ];
    }

    getDescription(): string {
        return "If we have food items, we will eat one";
    }
}

export {WanderGoal};