import {BaseAction} from "../../modules/goap/actions/BaseAction";
import {StatsManager} from "../../modules/stats/StatManager";
import {FoodItemCount, HungerStat} from "../stats/StatLib";
import BehaviourComponent from "../components/BehaviourComponent";
import Wander from "../../modules/behaviors/steering/Wander";
import {Stat} from "../../modules/stats/Stat";

class EatAction extends BaseAction {
    static id = 'action-eat';

    _statsManager: StatsManager;

    constructor(statsManager: StatsManager) {
        super(EatAction.id);
        this._statsManager = statsManager;
    }

    checkPreconditions(): boolean {
        try {
            this.getStats();
            return true;
        } catch (e) {
            return false
        }
    }
    execute(): boolean {
        const {hungerStat, foodItemCountStat} = this.getStats();

        if(hungerStat && foodItemCountStat && !foodItemCountStat.isEmpty()) {
            hungerStat.subtract(20);
            foodItemCountStat.subtract(1);
            return true;
        }
        return false;
    }
    getCost(): number {
        throw new Error("Method not implemented.");
    }

    getStats(): { hungerStat: Stat; foodItemCountStat: Stat } {
        const hungerStat = this._statsManager.getStatById(HungerStat.id);
        const foodItemCountStat = this._statsManager.getStatById(FoodItemCount.id);

        if(hungerStat && foodItemCountStat) {
            return {hungerStat, foodItemCountStat};
        } else {
            throw new Error("Did not find hunger or foodItemCount stat ..");
        }


    }
}

class IdleAction extends BaseAction {
    static id = 'action-idle';

    _behaviourComponent: BehaviourComponent;

    constructor(behaviourComponent: BehaviourComponent) {
        super(IdleAction.id);
        this._behaviourComponent = behaviourComponent;
    }

    checkPreconditions(): boolean {
        return true;
    }
    execute(): boolean {
        if(this._behaviourComponent.isIdle()) {
            return true;
        } else {
            this._behaviourComponent.setIdle();
            return true;
        }
    }
    getCost(): number {
        throw new Error("Method not implemented.");
    }
}

class WanderAction extends BaseAction {
    static id = 'action-wander';

    _behaviourComponent: BehaviourComponent;

    constructor(behaviourComponent: BehaviourComponent) {
        super(WanderAction.id);
        this._behaviourComponent = behaviourComponent;
    }

    checkPreconditions(): boolean {
        return true;
    }
    execute(): boolean {
        if(this._behaviourComponent.currentBehavior instanceof Wander) {
            return true;
        } else {
            this._behaviourComponent.setBehavior(Wander.name);
            return true;
        }
    }
    getCost(): number {
        throw new Error("Method not implemented.");
    }
}

export {
    EatAction,
    IdleAction,
    WanderAction,
}