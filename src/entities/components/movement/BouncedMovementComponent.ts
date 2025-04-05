import VectorUtil from "../../../modules/math/vectors/VectorUtil";
import {ScreenMovementComponent} from "./ScreenMovementComponent";

class BouncedMovementComponent extends ScreenMovementComponent {
    update(deltaTime: number): void {
        // Apply acceleration to velocity
        this._velocity = VectorUtil.add(this._velocity, this._acceleration);

        // Limit velocity by max speed
        this._velocity.limit = this._maxSpeed;

        // Update location based on velocity and deltaTime
        this._location = VectorUtil.add(this._location, VectorUtil.multiply(this._velocity, deltaTime));

        // Bounce when hitting walls
        if (this._location.x < this.a.x || this._location.x > this.b.x) {
            this._velocity.x *= -1;
            this._location.x = Math.max(this.a.x, Math.min(this.b.x, this._location.x)); // Keep inside bounds
        }

        if (this._location.y < this.a.y || this._location.y > this.b.y) {
            this._velocity.y *= -1;
            this._location.y = Math.max(this.a.y, Math.min(this.b.y, this._location.y)); // Keep inside bounds
        }

        this._resetAcceleration();
    }
}

export { BouncedMovementComponent };
