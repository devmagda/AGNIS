import { Goal } from "./Goal";

abstract class BaseGoal implements Goal {
    id: string;

    protected subGoals: Map<string, Goal> = new Map();

    protected constructor(id: string) {
        this.id = id;
    }

    abstract getPriority(): number;
    abstract isSatisfied(): boolean;
    abstract getRelevantActions(): string[];

    hasSubGoal(goalId: string): boolean {
        return this.subGoals.has(goalId);
    }

    getSubGoals(): Goal[] {
        return Array.from(this.subGoals.values());
    }

    addSubGoal(goal: Goal): void {
        this.subGoals.set(goal.id, goal);
    }

    removeSubGoal(goalId: string): void {
        this.subGoals.delete(goalId);
    }

    equals(goal: Goal): boolean {
        return goal.id === this.id;
    }

    getBestSubGoal(): Goal | null {
        const bestGoals = Array.from(this.subGoals.values())
            .filter(BaseGoal.bestSubGoalFilterFunction);

        if (bestGoals.length === 0) {
            return null;
        }

        return bestGoals.reduce((best, current) => current.getPriority() > best.getPriority() ? current : best);
    }

    static bestSubGoalFilterFunction(goal: Goal): boolean {
        return !goal.isSatisfied() && goal.getPriority() > 0;
    }
}

export { BaseGoal };
