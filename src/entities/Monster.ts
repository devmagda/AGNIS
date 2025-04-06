import Entity from "./Entity";
import Vector2D from "../modules/math/vectors/Vector2D";
import {HealthStat, HungerStat} from "../modules/stats/StatLib";
import {HealthHungerRule} from "../modules/stats/StatRuleLib";

class Monster extends Entity {
    constructor(id: string, spawnLocation: Vector2D) {
        super(id, spawnLocation, 0.05 + Math.random() * 0.1, new HealthStat());
        this._statsComponent.statsManager.addStat(new HungerStat());
        this._statsComponent.statsManager.statRuleManager.addRule(HealthHungerRule);
    }
}

export {Monster};