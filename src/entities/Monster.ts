import Entity from "./Entity";
import Vector2D from "../modules/math/vectors/Vector2D";
import {HealthStat} from "../modules/stats/StatLib";

class Monster extends Entity {
    constructor(id: string, spawnLocation: Vector2D) {
        super(id, spawnLocation, 0.05 + Math.random() * 0.1, new HealthStat());
    }
}

export {Monster};