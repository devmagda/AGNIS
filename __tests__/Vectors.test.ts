import * as math from "mathjs";
import Vector2D from "../src/modules/math/vectors/Vector2D";
import VectorUtil from "../src/modules/math/vectors/VectorUtil";

describe('Vector2D', () => {
    test('should create a vector with given x and y', () => {
        const vector = new Vector2D(1, 2);
        expect(vector.x).toBe(1);
        expect(vector.y).toBe(2);
    });

    test('should calculate the magnitude correctly', () => {
        const vector = new Vector2D(3, 4); // magnitude = sqrt(3^2 + 4^2) = 5
        expect(vector.magnitude).toBe(5);
    });

    test('should normalize the vector', () => {
        const vector = new Vector2D(3, 4);
        vector.normalize(); // magnitude should be 1 after normalization
        expect(vector.magnitude).toBe(1);
    });

    test('should limit the vector magnitude to a specified value', () => {
        const vector = new Vector2D(3, 4); // magnitude = 5
        vector.limit = 3; // should limit to 3
        expect(vector.magnitude).toBe(3);
    });

    test('should calculate the angle of the vector in degrees', () => {
        const vector = new Vector2D(1, 1); // angle should be 45 degrees
        expect(vector.angle).toBeCloseTo(45);
    });

    test('should set and get position correctly', () => {
        const vector = new Vector2D(1, 2);
        const newPosition = math.matrix([5, 6]);
        vector.position = newPosition;
        expect(vector.position).toEqual(newPosition);
    });

    test('should copy position from another vector using "inner" setter', () => {
        const vectorA = new Vector2D(1, 2);
        const vectorB = new Vector2D(3, 4);
        vectorA.inner = vectorB;
        expect(vectorA.position).toEqual(vectorB.position);
    });

    test('should set x and y correctly', () => {
        const vector = new Vector2D(1, 2);
        vector.x = 5;
        vector.y = 6;
        expect(vector.x).toBe(5);
        expect(vector.y).toBe(6);
    });
});

describe('VectorUtil', () => {
    test('should add two vectors correctly', () => {
        const vectorA = new Vector2D(1, 2);
        const vectorB = new Vector2D(3, 4);
        const result = VectorUtil.add(vectorA, vectorB);
        expect(result.x).toBe(4);  // 1 + 3
        expect(result.y).toBe(6);  // 2 + 4
    });

    test('should subtract two vectors correctly', () => {
        const vectorA = new Vector2D(5, 6);
        const vectorB = new Vector2D(3, 4);
        const result = VectorUtil.subtract(vectorA, vectorB);
        expect(result.x).toBe(2);  // 5 - 3
        expect(result.y).toBe(2);  // 6 - 4
    });

    test('should multiply a vector by a scalar correctly', () => {
        const vector = new Vector2D(1, 2);
        const result = VectorUtil.multiply(vector, 3);
        expect(result.x).toBe(3);  // 1 * 3
        expect(result.y).toBe(6);  // 2 * 3
    });

    test('should calculate the distance between two vectors correctly', () => {
        const vectorA = new Vector2D(1, 1);
        const vectorB = new Vector2D(4, 5);
        const result = VectorUtil.distance(vectorA, vectorB);
        expect(result).toBeCloseTo(5);  // distance = sqrt((4-1)^2 + (5-1)^2) = 5
    });
});
