import {RootGoal} from "./RootGoal";
import {Goal} from "./Goal";
import {ActionManager} from "../actions/ActionManager";

class GoalTree {
    _rootGoal: RootGoal;
    _actionManager: ActionManager;
    constructor() {
        this._rootGoal  = new RootGoal();
        this._actionManager = new ActionManager();
    }

    addGoalTree(goal: Goal): void {
        this._rootGoal.addSubGoal(goal);
    }

    execute(): Goal {
        let currentGoal: Goal | null = this._rootGoal;
        let lastGoal: Goal | null = null;
        while (true) {
            if (!currentGoal) {
                console.error("Failing goal tree: ", this);
                console.error("Last goal:", lastGoal);
                throw new Error("There was a failing leaf node in the goal tree.");
            }

            const executed = currentGoal.execute(this._actionManager);
            const satisfied = currentGoal.isSatisfied();

            //console.log('Current goal <' + currentGoal.id + '> is:');
            //if(executed) console.log('executed');
            //if(satisfied) console.log('satisfied');

            if(executed && satisfied) {
                return currentGoal;
            } else {
                lastGoal = currentGoal;
                currentGoal = currentGoal.getBestSubGoal();
            }
        }
    }
}

export {GoalTree};