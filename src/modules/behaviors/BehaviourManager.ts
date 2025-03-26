import SeekTarget from "./steering/SeekTarget";
import Vector2D from "../math/vectors/Vector2D";
import Wander from "./steering/Wander";
import Behaviour from "./Behaviour";

class BehaviorManager {
    _behaviors: Behaviour[] = [];

    constructor() {
        // Initialize the list of available behaviors
        this._behaviors.push(new Wander());
        // You can add more behaviors as required
        this._behaviors.push(new SeekTarget(new Vector2D(0, 0))); // Default SeekTarget with placeholder
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
