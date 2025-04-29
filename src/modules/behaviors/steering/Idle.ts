import Vector2D from "../../math/vectors/Vector2D";
import VectorUtil from "../../math/vectors/VectorUtil";
import Entity from "../../../entities/Entity";
import Behaviour from "../Behaviour";

class Idle implements Behaviour {

    apply(entity: Entity): void {
        const factor = 0.0002;
        this.wander(entity, factor);
    }

    wander(entity: Entity, factor: number): void {
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

export default Idle;
