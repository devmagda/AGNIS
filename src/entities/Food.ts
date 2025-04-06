import Entity from "./Entity";
import Vector2D from "../modules/math/vectors/Vector2D";
import {Drawable} from "../modules/mvc/View";
import {EntityRenderer} from "../modules/drawing/EntityRenderer";
import {DurabilityStat} from "../modules/stats/StatLib";

class Food extends Entity implements Drawable {
    constructor(id: string, spawnLocation: Vector2D) {
        super(id, spawnLocation, 0, new DurabilityStat());
    }

    draw(ctx: CanvasRenderingContext2D) {
        const radius = 10 * this.aliveStat.factor;
        EntityRenderer.drawFood(ctx, this._movementComponent.location, radius);
    }
}

export {Food}