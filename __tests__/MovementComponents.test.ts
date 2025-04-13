import Vector2D from "../src/modules/math/vectors/Vector2D";
import {MovementComponent} from "../src/entities/components/movement/MovementComponent";
import VectorUtil from "../src/modules/math/vectors/VectorUtil";
import {BouncedMovementComponent} from "../src/entities/components/movement/BouncedMovementComponent";
import {WrappedMovementComponent} from "../src/entities/components/movement/WrappedMovementComponent";
import {BorderedMovementComponent} from "../src/entities/components/movement/BorderedMovementComponent";
import {MovementSpeed, Size} from "../src/entities/stats/StatLib";

describe('MovementComponent', () => {
    let component: MovementComponent;

    beforeEach(() => {
        const location = new Vector2D(0, 0);
        const maxSpeed = 10;
        component = new MovementComponent(location, new MovementSpeed(new Size(1), maxSpeed));
    });

    test('constructor initializes location, velocity, orientation, and maxSpeed', () => {
        expect(component.location).toEqual(new Vector2D(0, 0));
        expect(component.velocity).toEqual(VectorUtil.zero());
        expect(component.orientation).toEqual(VectorUtil.north());
    });

    test('applyForce updates acceleration correctly', () => {
        const force = new Vector2D(1, 1);
        component.applyForce(force);
        expect(component._acceleration).toEqual(new Vector2D(1, 1));
    });

    test('update correctly updates location and velocity', () => {
        const force = new Vector2D(1, 1);
        component.applyForce(force);
        component.update(1);
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
        borderedComponent = new BorderedMovementComponent(location, new MovementSpeed(new Size(1), maxSpeed), a, b);
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