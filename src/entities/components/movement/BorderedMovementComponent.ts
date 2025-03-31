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

    get a(): Vector2D {
        return this._a;
    }

    get b(): Vector2D {
        return this._b;
    }

    isOutOfBounds() {
        const x = this._location.x;
        const y = this._location.y;

        const ax = this.a.x;
        const ay = this.a.y;
        const bx = this.b.x;
        const by = this.b.y;

        return x > bx || x < ax || y > by || y < ay;
    }
}

export { BorderedMovementComponent };
