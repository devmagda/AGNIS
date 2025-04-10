import Vector2D from "../../math/vectors/Vector2D";
import Behaviour from "../Behaviour";
import Entity from "../../../entities/Entity";
import VectorUtil from "../../math/vectors/VectorUtil";
import {EventBus} from "../../eventbus/EventBus";

class SeekTarget implements Behaviour {
    protected _target: Vector2D;

    constructor(target: Vector2D) {
        this._target = target;
    }

    apply(entity: Entity): void {
        const movementComponent = entity.movementComponent;

        const currentPosition = movementComponent.location;

        const direction = VectorUtil.subtract(this._target, currentPosition);

        const normalizedDirection = VectorUtil.normalize(direction);

        movementComponent.velocity = VectorUtil.multiply(normalizedDirection, movementComponent.maxSpeed);
    }

    updateTarget(newTarget: Vector2D) {
        this._target = newTarget;
    }
}

export default SeekTarget;
