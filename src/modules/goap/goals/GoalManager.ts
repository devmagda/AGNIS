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
            // Get the best possible subgoal
            currentGoal = currentGoal.getBestSubGoal();

            // If there are no more subgoals to consider, return the root goal as fallback
            if (!currentGoal) {
                return this._rootGoal; // Fallback to root goal if no subgoal is found
            }

            // Check if the current goal is satisfied
            if (currentGoal.isSatisfied()) {
                // If satisfied, return this goal (it’s the one we want)
                selectedGoal = currentGoal;
            }
        }

        return selectedGoal;
    }
}