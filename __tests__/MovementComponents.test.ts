import Vector2D from "../src/modules/math/vectors/Vector2D";
import {MovementComponent} from "../src/entities/components/movement/MovementComponent";
import VectorUtil from "../src/modules/math/vectors/VectorUtil";
import {BouncedMovementComponent} from "../src/entities/components/movement/BouncedMovementComponent";
import {WrappedMovementComponent} from "../src/entities/components/movement/WrappedMovementComponent";
import {BorderedMovementComponent} from "../src/entities/components/movement/BorderedMovementComponent";

describe('MovementComponent', () => {
    let component: MovementComponent;

    beforeEach(() => {
        const location = new Vector2D(0, 0);
        const maxSpeed = 10;
        component = new MovementComponent(location, maxSpeed);
    });

    test('constructor initializes location, velocity, orientation, and maxSpeed', () => {
        expect(component.location).toEqual(new Vector2D(0, 0));
        expect(component.velocity).toEqual(VectorUtil.zero());
        expect(component.orientation).toEqual(VectorUtil.north());
        expect(component.maxSpeed).toBe(10);
    });

    test('applyForce updates acceleration correctly', () => {
        const force = new Vector2D(1, 1);
        component.applyForce(force);
        expect(component._acceleration).toEqual(new Vector2D(1, 1));
    });

    test('update correctly updates location and velocity', () => {
        const force = new Vector2D(1, 1);
        component.applyForce(force);
        component.update();
        expect(component.location).not.toEqual(new Vector2D(0, 0));
        expect(component.velocity).not.toEqual(VectorUtil.zero());
    });
});

describe('BorderedMovementComponent', () => {
    let borderedComponent: BorderedMovementComponent;

    beforeEach(() => {
        const location = new Vector2D(5, 5);
        const maxSpeed = 10;
        const a = new Vector2D(0, 0);
        const b = new Vector2D(10, 10);
        borderedComponent = new BorderedMovementComponent(location, maxSpeed, a, b);
    });

    test('isOutOfBounds correctly detects out-of-bounds locations', () => {
        borderedComponent._location = new Vector2D(11, 5);
        expect(borderedComponent.isOutOfBounds()).toBe(true);

        borderedComponent._location = new Vector2D(5, 11);
        expect(borderedComponent.isOutOfBounds()).toBe(true);

        borderedComponent._location = new Vector2D(5, 5);
        expect(borderedComponent.isOutOfBounds()).toBe(false);
    });
});

describe('BouncedMovementComponent', () => {
    let bouncedComponent: BouncedMovementComponent;

    beforeEach(() => {
        const location = new Vector2D(5, 5);
        const maxSpeed = 10;
        const a = new Vector2D(0, 0);
        const b = new Vector2D(10, 10);
        bouncedComponent = new BouncedMovementComponent(location, maxSpeed, a, b);
    });

    test('update correctly bounces off the walls when out of bounds', () => {
        bouncedComponent._location = new Vector2D(11, 5);
        bouncedComponent._velocity = new Vector2D(1, 0);
        bouncedComponent.update();
        expect(bouncedComponent._location.x).toBe(10);  // Should be clamped to the max X boundary.
        expect(bouncedComponent._velocity.x).toBe(-1);  // Should reverse direction.

        bouncedComponent._location = new Vector2D(5, 11);
        bouncedComponent._velocity = new Vector2D(0, 1);
        bouncedComponent.update();
        expect(bouncedComponent._location.y).toBe(10);  // Should be clamped to the max Y boundary.
        expect(bouncedComponent._velocity.y).toBe(-1);  // Should reverse direction.
    });
});

describe('WrappedMovementComponent', () => {
    let wrappedComponent: WrappedMovementComponent;

    beforeEach(() => {
        const location = new Vector2D(5, 5);
        const maxSpeed = 1;
        const a = new Vector2D(0, 0);
        const b = new Vector2D(10, 10);
        wrappedComponent = new WrappedMovementComponent(location, maxSpeed, a, b);
    });

    test('update correctly wraps around the edges of the bounded area', () => {
        wrappedComponent._location = new Vector2D(11, 5);
        wrappedComponent.update();
        expect(wrappedComponent._location.x).toBe(0);  // Should wrap to the left side.

        wrappedComponent._location = new Vector2D(5, 11);
        wrappedComponent.update();
        expect(wrappedComponent._location.y).toBe(0);  // Should wrap to the top side.
    });

    test('getWrappedPositions returns correct positions when near edges', () => {
        const radius = 1;  // Set the radius parameter.

        // Testing horizontal wrapping
        wrappedComponent._location = new Vector2D(10, 5);
        const positions = wrappedComponent.getWrappedPositions(radius);

        expect(positions).toContainEqual(new Vector2D(10, 5));  // Original position
        expect(positions).toContainEqual(new Vector2D(0, 5));   // Wrapped horizontally

        // Testing vertical wrapping
        wrappedComponent._location = new Vector2D(5, 10);
        const positionsVertical = wrappedComponent.getWrappedPositions(radius);

        expect(positionsVertical).toContainEqual(new Vector2D(5, 10));  // Original position
        expect(positionsVertical).toContainEqual(new Vector2D(5, 0));   // Wrapped vertically
    });

});

