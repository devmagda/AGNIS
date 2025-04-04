import Behaviour from "./Behaviour";
import {SeekMouse} from "./steering/SeekMouse";

class BehaviorManager {
    _behaviors: Behaviour[] = [];

    constructor() {
        this._behaviors.push(new SeekMouse());
    }

    // Add a new behavior to the list of available behaviors
    addBehavior(behavior: Behaviour): void {
        this._behaviors.push(behavior);
    }

    // Get a behavior by its type (for example, SeekTarget)
    getBehavior(type: string): Behaviour | null {
        return this._behaviors.find(b => b.constructor.name === type) || null;
    }

    // Get all available behaviors
    getAllBehaviors(): Behaviour[] {
        return this._behaviors;
    }
}

export default BehaviorManager;
