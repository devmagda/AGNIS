import {BaseGoal} from "./BaseGoal";
import { Goal } from "./Goal";

class RootGoal extends BaseGoal {
    static id = 'root-goal';
    public constructor() {
        super(RootGoal.id);
    }

    getPriority(): number {
        return 1;
    }
    isSatisfied(): boolean {
        return false;
    }
    getRelevantActions(): string[] {
        return [];
    }
}

export {RootGoal};