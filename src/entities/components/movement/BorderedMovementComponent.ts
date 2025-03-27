import Vector2D from "../../../modules/math/vectors/Vector2D";
import VectorUtil from "../../../modules/math/vectors/VectorUtil";
import { MovementComponent } from "./MovementComponent";

class BorderedMovementComponent extends MovementComponent {
    _a: Vector2D; // Upper-left corner
    _b: Vector2D; // Lower-right corner

    constructor(location: Vector2D, maxSpeed: number, a: Vector2D, b: Vector2D) {
        super(location, maxSpeed);
        this._a = a;
        this._b = b;
    }

    isOutOfBounds() {
        const x = this._location.x;
        const y = this._location.y;

        const ax = this._a.x;
        const ay = this._a.y;
        const bx = this._b.x;
        const by = this._b.y;

        return x > bx || x < ax || y > by || y < ay;
    }
}

export { BorderedMovementComponent };
