import * as math from 'mathjs';

export default class Vector2D {
    constructor(x: number, y: number) {
        this._position = math.matrix([x, y]);
    }

    private _position: math.Matrix;

    get position() {
        return this._position;
    }

    set position(position: math.Matrix) {
        this._position = position;
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

    set x(value: number) {
        this._position.set([0], value);
    }

    get y(): number {
        return this._position.get([1]);
    }

    set y(value: number) {
        this._position.set([1], value);
    }

    // In degrees
    get angle(): number {
        const angleRadians = Math.atan2(this.y, this.x);
        return (angleRadians * 180) / Math.PI; // Convert radians to degrees
    }

    toString(): string {
        return `Vector2D(${this.x}, ${this.y})`;
    }

    normalize(): void {
        this.limit = 1;  // Normalizing by limiting the vector's magnitude to 1
    }

    add(other: Vector2D): void {
        this._position = math.add(this._position, other.position);
    }

    subtract(other: Vector2D): void {
        this.add(new Vector2D(-other.x, -other.y));
    }

    equals(other: Vector2D): boolean {
        const epsilon = 0.00001;
        return Math.abs(this.x - other.x) < epsilon && Math.abs(this.y - other.y) < epsilon;
    }

}
