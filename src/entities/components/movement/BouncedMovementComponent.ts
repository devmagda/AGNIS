import Vector2D from "../../../modules/math/vectors/Vector2D";
import VectorUtil from "../../../modules/math/vectors/VectorUtil";
import { BorderedMovementComponent } from "./BorderedMovementComponent";
import {ScreenMovementComponent} from "./ScreenMovementComponent";

class BouncedMovementComponent extends ScreenMovementComponent {
    update(): void {
        this._velocity = VectorUtil.add(this._velocity, this._acceleration);
        this._velocity.limit = this._maxSpeed;
        this._location = VectorUtil.add(this._location, this._velocity);

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
