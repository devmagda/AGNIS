import Vector2D from "../../../modules/math/vectors/Vector2D";
import VectorUtil from "../../../modules/math/vectors/VectorUtil";

class MovementComponent {
    _location: Vector2D;
    _velocity: Vector2D;
    _orientation: Vector2D;
    _acceleration: Vector2D;
    _maxSpeed: number;

    constructor(location: Vector2D, maxSpeed: number) {
        this._location = location;
        this._velocity = VectorUtil.zero();
        this._orientation = VectorUtil.north();
        this._acceleration = VectorUtil.zero();
        this._maxSpeed = maxSpeed;
    }

    get location(): Vector2D {
        return this._location;
    }

    get velocity(): Vector2D {
        return this._velocity;
    }

    get orientation(): Vector2D {
        return this._orientation;
    }

    get maxSpeed(): number {
        return this._maxSpeed;
    }

    set location(value: Vector2D) {
        this._location = value;
    }

    set velocity(value: Vector2D) {
        this._velocity = value;
        if (!VectorUtil.equals(value, VectorUtil.zero())) {
            this._orientation = VectorUtil.normalize(value);
        }
    }

    set orientation(value: Vector2D) {
        const isMoving = !VectorUtil.equals(this._velocity, VectorUtil.zero());

        if (!isMoving) {
            this._orientation = VectorUtil.normalize(value);
        } else {
            console.warn('Trying to set rotation for a moving object', this, value);
        }
    }

    set maxSpeed(value: number) {
        if (value < 0) {
            console.warn('maxSpeed cannot be negative, setting to 0');
            this._maxSpeed = 0;
        } else {
            this._maxSpeed = value;
        }
    }

    applyForce(force: Vector2D): void {
        this._acceleration = VectorUtil.add(this._acceleration, force);
    }

    // Update with deltaTime to ensure movement is smooth across frame rates
    update(deltaTime: number): void {
        // Scale the velocity by deltaTime
        this._velocity = VectorUtil.add(this._velocity, this._acceleration);

        // Limit the velocity according to maxSpeed
        this._velocity.limit = this._maxSpeed;

        // Apply deltaTime to the location update to ensure consistent movement
        this._location = VectorUtil.add(this._location, VectorUtil.multiply(this._velocity, deltaTime));

        // Reset acceleration
        this._resetAcceleration();
    }

    _resetAcceleration() {
        this._acceleration = VectorUtil.zero();
    }
}

export {MovementComponent};