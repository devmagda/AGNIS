import Entity from "./Entity";
import Vector2D from "../modules/math/vectors/Vector2D";
import {HealthStat, HungerStat} from "../modules/stats/StatLib";
import {EventBus} from "../modules/eventbus/EventBus";
import {Stat} from "../modules/stats/Stat";

class Monster extends Entity {
    constructor(id: string, spawnLocation: Vector2D) {
        super(id, spawnLocation, 0.05 + Math.random() * 0.1, new HealthStat());
        this._statsComponent.statsManager.addStat(new HungerStat());
    }
}

export {Monster};