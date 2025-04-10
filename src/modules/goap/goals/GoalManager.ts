import {RootGoal} from "./RootGoal";
import {Goal} from "./Goal";
import {ActionManager} from "../actions/ActionManager";

class GoalManager {
    _rootGoal: RootGoal;
    _actionManager: ActionManager;
    constructor() {
        this._rootGoal  = new RootGoal();
        this._actionManager = new ActionManager();
    }

    addGoalTree(goal: Goal): void {
        this._rootGoal.addSubGoal(goal);
    }

    find(): Goal {
        let selectedGoal: Goal | null = null;
        let currentGoal: Goal | null = this._rootGoal;

        while (!selectedGoal) {
            currentGoal = currentGoal.getBestSubGoal();

            if (!currentGoal) {
                return this._rootGoal;
            }

            if (!currentGoal.hasSubGoals()) {
                selectedGoal = currentGoal;
            }
        }

        return selectedGoal;
    }
}