import {Idable} from "../../math/IdGen";
import {ActionManager} from "../actions/ActionManager";

interface Goal extends Idable {
    getPriority(): number;

    isSatisfied(): boolean;

    getRelevantActions(): string[];

    getSubGoals(): Goal[];

    hasSubGoal(goalId: string): boolean;

    hasSubGoals(): boolean;

    equals(goal: Goal): boolean;  // Add this method to compare goals

    getBestSubGoal(): Goal | null;

    getDescription(): string;

    execute(actionManager: ActionManager): boolean;
}

export {Goal};