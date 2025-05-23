import Vector2D from "../../../modules/math/vectors/Vector2D";
import VectorUtil from "../../../modules/math/vectors/VectorUtil";
import {ScreenMovementComponent} from "./ScreenMovementComponent";

class WrappedMovementComponent extends ScreenMovementComponent {
    update(deltaTime: number): void {
        // Apply acceleration to velocity
        this._velocity = VectorUtil.add(this._velocity, this._acceleration);

        // Limit velocity by max speed
        this._velocity.limit = this._maxSpeed.baseValue;

        // Update location based on velocity and deltaTime
        this._location = VectorUtil.add(this._location, VectorUtil.multiply(this._velocity, deltaTime));

        // Wrap around when out of bounds
        if (this._location.x < this.a.x) {
            this._location.x = this.b.x;
        } else if (this._location.x > this.b.x) {
            this._location.x = this.a.x;
        }

        if (this._location.y < this.a.y) {
            this._location.y = this.b.y;
        } else if (this._location.y > this.b.y) {
            this._location.y = this.a.y;
        }

        const speed = this._velocity.magnitude;

        this._resetAcceleration();
        this._maxSpeed.reset();
        this._maxSpeed.add(speed);
    }

    getWrappedPositions(radius: number): Vector2D[] {
        const {x, y} = this._location;
        const {x: minX, y: minY} = this.a;
        const {x: maxX, y: maxY} = this.b;

        let positions = [new Vector2D(x, y)];

        // Wrap positions when near edges
        if (x - radius < minX) positions.push(new Vector2D(x + (maxX - minX), y));
        if (x + radius > maxX) positions.push(new Vector2D(x - (maxX - minX), y));
        if (y - radius < minY) positions.push(new Vector2D(x, y + (maxY - minY)));
        if (y + radius > maxY) positions.push(new Vector2D(x, y - (maxY - minY)));

        // Corner cases (both X and Y wrapping)
        if (x - radius < minX && y - radius < minY) positions.push(new Vector2D(x + (maxX - minX), y + (maxY - minY)));
        if (x + radius > maxX && y - radius < minY) positions.push(new Vector2D(x - (maxX - minX), y + (maxY - minY)));
        if (x - radius < minX && y + radius > maxY) positions.push(new Vector2D(x + (maxX - minX), y - (maxY - minY)));
        if (x + radius > maxX && y + radius > maxY) positions.push(new Vector2D(x - (maxX - minX), y - (maxY - minY)));

        return positions;
    }
}

export {WrappedMovementComponent};
