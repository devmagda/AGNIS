import {BorderedMovementComponent} from "./BorderedMovementComponent";
import Vector2D from "../../../modules/math/vectors/Vector2D";
import {Stat} from "../../../modules/stats/Stat";
import {MovementSpeed} from "../../stats/StatLib";

class ScreenMovementComponent extends BorderedMovementComponent {
    constructor(location: Vector2D, maxSpeed: MovementSpeed) {
        super(location, maxSpeed, new Vector2D(0, 0), new Vector2D(window.innerWidth, window.innerHeight));
    }

    get b() {
        return new Vector2D(window.innerWidth, window.innerHeight);
    }
}

export {ScreenMovementComponent};