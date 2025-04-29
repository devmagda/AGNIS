import {BaseGoal} from "../../modules/goap/goals/BaseGoal";
import {StatsManager} from "../../modules/stats/StatManager";
import {HungerStat} from "../stats/StatLib";
import {EatAction} from "../actions/ActionLib";
import {WanderGoal} from "./WanderGoal";
import BehaviourComponent from "../components/BehaviourComponent";
import {ActionManager} from "../../modules/goap/actions/ActionManager";

class EatGoal extends BaseGoal {
    static id = 'goal-eat';
    private readonly _statsManager: StatsManager;
    private _lastHunger = 0;
    constructor(statsManager: StatsManager, behaviourComponent: BehaviourComponent) {
        super(EatGoal.id);
        this._statsManager = statsManager;
        this.addSubGoal(new WanderGoal(behaviourComponent));
    }

    getPriority(): number {
        const hungerStat = this._statsManager.getStatById(HungerStat.id);
        if(hungerStat) {
            return hungerStat.factor;
        } else {
            return 0;
        }
    }

    isSatisfied(): boolean {
        const hungerStat = this._statsManager.getStatById(HungerStat.id);
        if(hungerStat) {
            return this._lastHunger > hungerStat.value;
        } else {
            return false;
        }
    }

    getRelevantActions(): string[] {
        return [
            EatAction.id
        ];
    }

    getDescription(): string {
        return "If we have food items, we will eat one";
    }

    execute(actionManager: ActionManager): boolean {
        const executed = super.execute(actionManager);
        const hungerStat = this._statsManager.getStatById(HungerStat.id);

        if(executed && hungerStat) {
            this._lastHunger = hungerStat.value;
            return true;
        }
        return false;
    }
}

export {EatGoal};