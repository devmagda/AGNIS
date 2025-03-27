import BehaviorManager from "../../modules/behaviors/BehaviourManager";
import Vector2D from "../../modules/math/vectors/Vector2D";
import Entity from "../Entity";
import SeekTarget from "../../modules/behaviors/steering/SeekTarget";
import Behaviour from "../../modules/behaviors/Behaviour";
import Wander from "../../modules/behaviors/steering/Wander";

class BehaviorComponent {
    private _currentBehavior: Behaviour;
    private _target: Vector2D; // Target used by behaviors like SeekTarget
    private _behaviorManager: BehaviorManager; // Manager for all behaviors

    constructor() {
        this._behaviorManager = new BehaviorManager(); // Initialize the BehaviorManager
        this._currentBehavior = this._behaviorManager.getBehavior('Wander') || new Wander(); // Default to Wander
        this._target = new Vector2D(0, 0); // Default target location
    }

    // Apply the current behavior to the entity
    apply(entity: Entity): void {
        if (this._currentBehavior) {
            this._currentBehavior.apply(entity);
        }
    }

    // Set the current behavior from the available list
    setBehavior(type: string): void {
        const behavior = this._behaviorManager.getBehavior(type);
        if (behavior) {
            this._currentBehavior = behavior;
        } else {
            console.warn(`Behavior of type ${type} not found`);
        }
    }

    // Update the target for behaviors that require a target (e.g., SeekTarget)
    updateTarget(target: Vector2D): void {
        this._target = target;
        if (this._currentBehavior instanceof SeekTarget) {
            this._currentBehavior.updateTarget(target); // Update SeekTarget behavior with new target
        }
    }

    // Get the current behavior
    get currentBehavior(): Behaviour {
        return this._currentBehavior;
    }
}

export default BehaviorComponent;
