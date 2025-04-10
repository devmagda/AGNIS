import {Idable} from "../../math/IdGen";

interface Goal extends Idable {
    getPriority(): number;

    isSatisfied(): boolean;

    getRelevantActions(): string[];

    getSubGoals(): Goal[];

    hasSubGoal(goalId: Goal): boolean;

    equals(goal: Goal): boolean;  // Add this method to compare goals
}

export {Goal};