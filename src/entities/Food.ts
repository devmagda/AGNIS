import Entity from "./Entity";
import Vector2D from "../modules/math/vectors/Vector2D";
import {Drawable} from "../modules/mvc/View";
import {WrappedMovementComponent} from "./components/movement/WrappedMovementComponent";
import {EntityRenderer} from "../modules/drawing/EntityRenderer";

class Food extends Entity implements Drawable {
    constructor(id: string, spawnLocation: Vector2D) {
        super(id, spawnLocation, 0);
    }

    draw(ctx: CanvasRenderingContext2D) {
        const radius = 10;
        EntityRenderer.drawFood(ctx, this._movementComponent.location, radius);
    }
}

export {Food}