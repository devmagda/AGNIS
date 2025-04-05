import Vector2D from "../../math/vectors/Vector2D";
import VectorUtil from "../../math/vectors/VectorUtil";
import Entity from "../../../entities/Entity";
import Behaviour from "../Behaviour";

class Wander implements Behaviour {
    private _radius: number; // Wander radius
    private _wanderDistance: number; // Distance to wander
    private _wanderJitter: number; // Jitter amount to make the wander direction more random
    private _currentAngle: number = 0; // Keeps track of the current wander angle

    constructor(radius: number = 10, wanderDistance: number = 5, wanderJitter: number = 1) {
        this._radius = radius;
        this._wanderDistance = wanderDistance;
        this._wanderJitter = wanderJitter;
    }

    apply(entity: Entity): void {
        const factor = Math.random() * 0.01;
        const doubledFactor = factor + factor;

        const movementComponent = entity.movementComponent;
        const x = (Math.random() * doubledFactor) - factor;
        const y = (Math.random() * doubledFactor) - factor;
        const v = new Vector2D(x, y);

        const newVelocity = VectorUtil.add(movementComponent.velocity, v);
        newVelocity.limit = movementComponent.maxSpeed;

        movementComponent.velocity = newVelocity;
    }
}

export default Wander;
