import Vector2D from "../../../modules/math/vectors/Vector2D";
import VectorUtil from "../../../modules/math/vectors/VectorUtil";
import { BorderedMovementComponent } from "./BorderedMovementComponent";

class BouncedMovementComponent extends BorderedMovementComponent {
    update(): void {
        this._velocity = VectorUtil.add(this._velocity, this._acceleration);
        this._velocity.limit = this._maxSpeed;
        this._location = VectorUtil.add(this._location, this._velocity);

        // Bounce when hitting walls
        if (this._location.x < this._a.x || this._location.x > this._b.x) {
            this._velocity.x *= -1;
            this._location.x = Math.max(this._a.x, Math.min(this._b.x, this._location.x)); // Keep inside bounds
        }

        if (this._location.y < this._a.y || this._location.y > this._b.y) {
            this._velocity.y *= -1;
            this._location.y = Math.max(this._a.y, Math.min(this._b.y, this._location.y)); // Keep inside bounds
        }

        this._resetAcceleration();
    }
}

export { BouncedMovementComponent };
