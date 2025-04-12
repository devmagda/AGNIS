import {BaseGoal} from "../../modules/goap/goals/BaseGoal";
import {StatsManager} from "../../modules/stats/StatManager";
import {HungerStat} from "../stats/StatLib";
import {EatGoal} from "./EatGoal";
import {ActionManager} from "../../modules/goap/actions/ActionManager";
import behaviourComponent from "../components/BehaviourComponent";
import BehaviourComponent from "../components/BehaviourComponent";

class HungerGoal extends BaseGoal {
    static id = 'goal-hunger';
    private readonly _statsManager: StatsManager;
    constructor(statsManager: StatsManager, behaviourComponent: BehaviourComponent) {
        super(HungerGoal.id);
        this._statsManager = statsManager;
        this.addSubGoal(new EatGoal(statsManager, behaviourComponent));
    }

    getPriority(): number {
        const hungerStat = this._statsManager.getStatById(HungerStat.id);
        if(hungerStat) {
            return hungerStat.factor * hungerStat.factor;
        } else {
            return 0;
        }
    }

    isSatisfied(): boolean {
        const hungerStat = this._statsManager.getStatById(HungerStat.id);
        if(hungerStat) {
            return hungerStat.factor < 0.10;
        } else {
            return false;
        }
    }

    getRelevantActions(): string[] {
        return [];
    }

    getDescription(): string {
        return "Checks if we are hungry.";
    }
}

export {HungerGoal};