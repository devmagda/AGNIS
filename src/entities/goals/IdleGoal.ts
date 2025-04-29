import {BaseGoal} from "../../modules/goap/goals/BaseGoal";
import {StatsManager} from "../../modules/stats/StatManager";
import {HungerStat} from "../stats/StatLib";
import BehaviorManager from "../../modules/behaviors/BehaviourManager";
import BehaviorComponent from "../components/BehaviourComponent";
import behaviourComponent from "../components/BehaviourComponent";
import {IdleAction} from "../actions/ActionLib";

class IdleGoal extends BaseGoal {
    static id = 'goal-idle';
    private readonly _behaviourComponent: BehaviorComponent;
    constructor(behaviourComponent: BehaviorComponent) {
        super(IdleGoal.id);
        this._behaviourComponent = behaviourComponent;
    }

    getPriority(): number {
        return 0.1;
    }

    isSatisfied(): boolean {
        return this._behaviourComponent.isIdle();
    }

    getRelevantActions(): string[] {
        return [
            IdleAction.id,
        ];
    }

    getDescription(): string {
        return "If we have food items, we will eat one";
    }
}

export {IdleGoal};