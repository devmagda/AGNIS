import Entity from "./Entity";
import Vector2D from "../modules/math/vectors/Vector2D";
import {Drawable} from "../modules/mvc/View";
import {EntityRenderer} from "../modules/drawing/EntityRenderer";
import {DurabilityStat, MovementSpeed} from "./stats/StatLib";
import {Ids} from "./EntityIds";

class Food extends Entity implements Drawable {
    id = Ids.food;
    constructor(spawnLocation: Vector2D) {
        super(spawnLocation, 0, new DurabilityStat());
        this.movementSpeed = new MovementSpeed(this.sizeStat, 0);
    }

    draw(ctx: CanvasRenderingContext2D) {
        const radius = 10 * this.aliveStat.factor;
        EntityRenderer.drawFood(ctx, this._movementComponent.location, radius);
    }

    update(deltaTime: number) {
        this._statsComponent.update(deltaTime);
    }
}

export {Food}