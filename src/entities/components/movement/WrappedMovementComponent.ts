import Vector2D from "../../../modules/math/vectors/Vector2D";
import VectorUtil from "../../../modules/math/vectors/VectorUtil";
import { BorderedMovementComponent } from "./BorderedMovementComponent";

class WrappedMovementComponent extends BorderedMovementComponent {
    update(): void {
        this._velocity = VectorUtil.add(this._velocity, this._acceleration);
        this._velocity.limit = this._maxSpeed;
        this._location = VectorUtil.add(this._location, this._velocity);

        // Wrap around when out of bounds
        if (this._location.x < this._a.x) {
            this._location.x = this._b.x;
        } else if (this._location.x > this._b.x) {
            this._location.x = this._a.x;
        }

        if (this._location.y < this._a.y) {
            this._location.y = this._b.y;
        } else if (this._location.y > this._b.y) {
            this._location.y = this._a.y;
        }

        this._resetAcceleration();
    }

    getWrappedPositions(): Vector2D[] {
        const { x, y } = this._location;
        const { x: minX, y: minY } = this._a;
        const { x: maxX, y: maxY } = this._b;

        let positions = [new Vector2D(x, y)];

        // Wrap positions when near edges
        if (x - 30 < minX) positions.push(new Vector2D(x + (maxX - minX), y));
        if (x + 30 > maxX) positions.push(new Vector2D(x - (maxX - minX), y));
        if (y - 30 < minY) positions.push(new Vector2D(x, y + (maxY - minY)));
        if (y + 30 > maxY) positions.push(new Vector2D(x, y - (maxY - minY)));

        // Corner cases (both X and Y wrapping)
        if (x - 30 < minX && y - 30 < minY) positions.push(new Vector2D(x + (maxX - minX), y + (maxY - minY)));
        if (x + 30 > maxX && y - 30 < minY) positions.push(new Vector2D(x - (maxX - minX), y + (maxY - minY)));
        if (x - 30 < minX && y + 30 > maxY) positions.push(new Vector2D(x + (maxX - minX), y - (maxY - minY)));
        if (x + 30 > maxX && y + 30 > maxY) positions.push(new Vector2D(x - (maxX - minX), y - (maxY - minY)));

        return positions;
    }
}

export { WrappedMovementComponent };
