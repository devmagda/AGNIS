import Vector2D from "../../math/vectors/Vector2D";
import VectorUtil from "../../math/vectors/VectorUtil";
import Entity from "../../../entities/Entity";
import Behaviour from "../Behaviour";

class Wander implements Behaviour {
    private wanderAngle: number = Math.random() * Math.PI * 2;
    private readonly angleChange: number;
    private readonly circleDistance: number;
    private readonly circleRadius: number;

    constructor(
        circleDistance = 1.5,  // how far ahead the "wander circle" is
        circleRadius = 1.0,    // how wide the wiggle is
        angleChange = 0.3      // how much the wander direction changes each frame
    ) {
        this.circleDistance = circleDistance;
        this.circleRadius = circleRadius;
        this.angleChange = angleChange;
    }

    apply(entity: Entity): void {
        if (!entity.movementComponent) return;

        const movement = entity.movementComponent;
        const velocity = movement.velocity;

        if (velocity.magnitude === 0) return;

        // Normalize velocity to get the heading
        const heading = VectorUtil.normalize(velocity);

        // Find the circle center ahead of the entity by scaling the heading to the circleDistance
        const circleCenter = VectorUtil.multiply(heading, this.circleDistance);

        // Adjust wander angle a little
        this.wanderAngle += (Math.random() - 0.5) * 2 * this.angleChange;

        // Offset point on the circle (in the direction of the wander angle)
        const offset = new Vector2D(
            Math.cos(this.wanderAngle),
            Math.sin(this.wanderAngle)
        );

        // Scale the offset by circleRadius
        const wanderOffset = VectorUtil.multiply(offset, this.circleRadius);

        // Final steering force is the sum of circleCenter and wanderOffset
        const wanderForce = VectorUtil.add(circleCenter, wanderOffset);

        // Apply the wander force to the current velocity and ensure it does not exceed maxSpeed
        const newVelocity = VectorUtil.add(velocity, wanderForce);
        newVelocity.magnitude = movement.maxSpeed;

        // Update the entity's velocity
        movement.velocity = newVelocity;
    }
}

export default Wander;
