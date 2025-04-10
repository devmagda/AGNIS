import { Goal } from "./Goal";

abstract class BaseGoal implements Goal {
    id: string;

    protected subGoals: Set<Goal> = new Set();

    protected constructor(id: string) {
        this.id = id;
    }

    abstract getPriority(): number;
    abstract isSatisfied(): boolean;
    abstract getRelevantActions(): string[];
    abstract hasSubGoal(goalId: Goal): boolean;

    getSubGoals(): Goal[] {
        return Array.from(this.subGoals);
    }

    addSubGoal(goal: Goal): void {
        this.subGoals.add(goal);
    }

    equals(goal: Goal): boolean {
        return goal.id === this.id;
    }
}

export { BaseGoal };
