import * as math from "mathjs";
import Vector2D from "./Vector2D";

export default class VectorUtil {
    static ZERO_VECTOR = new Vector2D(0, 0);

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

    static zero(): Vector2D {
        return new Vector2D(0, 0);
    }

    static north(): Vector2D {
        return new Vector2D(0, -1);
    }

    static east(): Vector2D {
        return new Vector2D(1, 0);
    }

    static south(): Vector2D {
        return new Vector2D(0, 1);
    }

    static west(): Vector2D {
        return new Vector2D(-1, 0);
    }

    static canvasSize() {
        return new Vector2D(window.innerWidth, window.innerHeight);
    }

    static equals(a: Vector2D, b: Vector2D): boolean {
        return a.x === b.x && a.y === b.y;
    }

    static copy(a: Vector2D): Vector2D {
        return new Vector2D(a.x, a.y);
    }

    static normalize(a: Vector2D): Vector2D {
        const copy = VectorUtil.copy(a);
        copy.normalize();
        return copy;
    }

    static fromAngle(angle: number): Vector2D {
        const rad = (angle * Math.PI) / 180;  // Convert degrees to radians
        return new Vector2D(Math.cos(rad), Math.sin(rad));  // Return the unit vector in the direction of the angle
    }

    static getRandom(limits: Vector2D): Vector2D {
        const x = Math.random() * limits.x;
        const y = Math.random() * limits.y;
        return new Vector2D(x, y);
    }

    static circularOverlap(a: Vector2D, b: Vector2D, radiusA: number): boolean {
        const distance = VectorUtil.distance(a, b);
        return distance <= radiusA;
    }
}