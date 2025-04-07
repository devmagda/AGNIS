import Vector2D from "../src/modules/math/vectors/Vector2D";
import {CollisionUtil} from "../src/modules/physics/CollisionUtil";

describe('CollisionUtil Tests', () => {
    test('checkCircleOverlap should return true when circles overlap', () => {
        const circle1 = { position: new Vector2D(0, 0), radius: 5 };
        const circle2 = { position: new Vector2D(3, 4), radius: 5 };

        const result = CollisionUtil.checkCircleOverlap(circle1, circle2);

        expect(result).toBe(true);
    });

    test('checkCircleOverlap should return false when circles do not overlap', () => {
        const circle1 = { position: new Vector2D(0, 0), radius: 3 };
        const circle2 = { position: new Vector2D(10, 10), radius: 3 };

        const result = CollisionUtil.checkCircleOverlap(circle1, circle2);

        expect(result).toBe(false);
    });

    test('checkCircleBoxCollision should return true when circle overlaps with box', () => {
        const circle = { position: new Vector2D(5, 5), radius: 3 };
        const box = { position: new Vector2D(3, 3), size: new Vector2D(4, 4) };

        const result = CollisionUtil.checkCircleBoxCollision(circle, box);

        expect(result).toBe(true);
    });

    test('checkCircleBoxCollision should return false when circle does not overlap with box', () => {
        const circle = { position: new Vector2D(10, 10), radius: 3 };
        const box = { position: new Vector2D(3, 3), size: new Vector2D(4, 4) };

        const result = CollisionUtil.checkCircleBoxCollision(circle, box);

        expect(result).toBe(false);
    });

    test('checkBoxOverlap should return true when boxes overlap', () => {
        const box1 = { position: new Vector2D(0, 0), size: new Vector2D(5, 5) };
        const box2 = { position: new Vector2D(3, 3), size: new Vector2D(5, 5) };

        const result = CollisionUtil.checkBoxOverlap(box1, box2);

        expect(result).toBe(true);
    });

    test('checkBoxOverlap should return false when boxes do not overlap', () => {
        const box1 = { position: new Vector2D(0, 0), size: new Vector2D(5, 5) };
        const box2 = { position: new Vector2D(6, 6), size: new Vector2D(5, 5) };

        const result = CollisionUtil.checkBoxOverlap(box1, box2);

        expect(result).toBe(false);
    });

    test('checkPointInsideCircle should return true when point is inside circle', () => {
        const point = new Vector2D(3, 4);
        const circle = { position: new Vector2D(0, 0), radius: 5 };

        const result = CollisionUtil.checkPointInsideCircle(point, circle);

        expect(result).toBe(true);
    });

    test('checkPointInsideCircle should return false when point is outside circle', () => {
        const point = new Vector2D(10, 10);
        const circle = { position: new Vector2D(0, 0), radius: 5 };

        const result = CollisionUtil.checkPointInsideCircle(point, circle);

        expect(result).toBe(false);
    });

    test('checkPointInsideBox should return true when point is inside box', () => {
        const point = new Vector2D(4, 4);
        const box = { position: new Vector2D(3, 3), size: new Vector2D(5, 5) };

        const result = CollisionUtil.checkPointInsideBox(point, box);

        expect(result).toBe(true);
    });

    test('checkPointInsideBox should return false when point is outside box', () => {
        const point = new Vector2D(10, 10);
        const box = { position: new Vector2D(3, 3), size: new Vector2D(5, 5) };

        const result = CollisionUtil.checkPointInsideBox(point, box);

        expect(result).toBe(false);
    });
});
