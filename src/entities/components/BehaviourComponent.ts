import BehaviorManager from "../../modules/behaviors/BehaviourManager";
import BehaviourManager from "../../modules/behaviors/BehaviourManager";
import Vector2D from "../../modules/math/vectors/Vector2D";
import Entity from "../Entity";
import SeekTarget from "../../modules/behaviors/steering/SeekTarget";
import Behaviour from "../../modules/behaviors/Behaviour";
import Wander from "../../modules/behaviors/steering/Wander";
import Idle from "../../modules/behaviors/steering/Idle";

class BehaviorComponent {
    private _target: Vector2D; // Target used by behaviors like SeekTarget

    constructor() {
        this._behaviorManager = new BehaviorManager(); // Initialize the BehaviorManager
        this.behaviorManager.addBehavior(new SeekTarget(new Vector2D(0,0)));
        this.behaviorManager.addBehavior(new Wander());
        this.behaviorManager.addBehavior(new Idle());
        this._currentBehavior = this._behaviorManager.getBehavior(Idle.name) || new Idle(); // Default to Wander
        this._target = new Vector2D(0, 0); // Default target location
    }

    isIdle(): boolean {
        return this._currentBehavior instanceof Idle;
    }

    setIdle(): void {
        this._currentBehavior = this._behaviorManager.getBehavior(Idle.name) || new Idle();
    }

    private _currentBehavior: Behaviour;

    // Get the current behavior
    get currentBehavior(): Behaviour {
        return this._currentBehavior;
    }

    private _behaviorManager: BehaviorManager; // Manager for all behaviors

    get behaviorManager(): BehaviourManager {
        return this._behaviorManager;
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
}

export default BehaviorComponent;
