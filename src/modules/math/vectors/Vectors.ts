import * as math from 'mathjs';

class Vector2D {
    private _position: math.Matrix;

    constructor(x: number, y: number) {
        this._position = math.matrix([x, y]);
    }

    set position(position: math.Matrix) {
        this._position = position;
    }

    get position() {
        return this._position;
    }

    set inner(vector2D: Vector2D) {
        this._position = vector2D.position;
    }

    get magnitude(): number {
        const x = this._position.get([0]);
        const y = this._position.get([1]);
        return Math.sqrt(x * x + y * y);
    }

    set magnitude(value: number) {
        const currentMagnitude = this.magnitude;
        if (currentMagnitude !== 0) {
            const scalingFactor = value / currentMagnitude;
            this._position = math.multiply(this._position, scalingFactor);
        }
    }

    set limit(value: number) {
        const currentMagnitude = this.magnitude;
        if (currentMagnitude > value) {
            this.magnitude = value;
        }
    }

    get x(): number {
        return this._position.get([0]);
    }

    get y(): number {
        return this._position.get([1]);
    }

    set x(value: number) {
        this._position.set([0], value);
    }

    set y(value: number) {
        this._position.set([1], value);
    }

    // In degrees
    get angle(): number {
        const angleRadians = Math.atan2(this.y, this.x);
        return (angleRadians * 180) / Math.PI; // Convert radians to degrees
    }

    normalize(): void {
        this.limit = 1;  // Normalizing by limiting the vector's magnitude to 1
    }
}

class VectorUtil {
    static add(a: Vector2D, b: Vector2D): Vector2D {
        const resultPosition = math.add(a.position, b.position);
        return new Vector2D(resultPosition.get([0]), resultPosition.get([1]));
    }

    static subtract(a: Vector2D, b: Vector2D): Vector2D {
        const resultPosition = math.subtract(a.position, b.position);
        return new Vector2D(resultPosition.get([0]), resultPosition.get([1]));
    }

    static multiply(a: Vector2D, factor: number): Vector2D {
        const resultPosition = math.multiply(a.position, factor);
        return new Vector2D(resultPosition.get([0]), resultPosition.get([1]));
    }

    static distance(a: Vector2D, b: Vector2D): number {
        const diff = VectorUtil.subtract(a, b);
        return diff.magnitude;
    }
}

export {Vector2D, VectorUtil};
