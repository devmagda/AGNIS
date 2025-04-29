// StatLib.ts - A collection of common stats for games
import {Stat} from "../../modules/stats/Stat";
import {GrowingStat} from "../../modules/stats/GrowingStat";
import {MovementComponent} from "../components/movement/MovementComponent";

class HealthStat extends Stat {
    static id = "health"; // Static id for HealthStat

    constructor(baseValue: number = 100, decayRate: number = 0) {
        super(HealthStat.id, baseValue, decayRate);  // Pass static id to the parent constructor
    }
}

class DurabilityStat extends Stat {
    static id = "durability"; // Static id for DurabilityStat

    constructor(baseValue: number = 100, decayRate: number = 0.01) {
        super(DurabilityStat.id, baseValue, decayRate);  // Pass static id to the parent constructor
    }
}

class FoodItemCount extends Stat {
    static id = "foodItemCount";
    constructor(baseValue: number = 1, decayRate: number = 0) {
        super(FoodItemCount.id, baseValue, decayRate);
    }
}

class ManaStat extends Stat {
    static id = "mana"; // Static id for ManaStat

    constructor(baseValue: number = 100, decayRate: number = 0.03) {
        super(ManaStat.id, baseValue, decayRate);  // Pass static id to the parent constructor
    }
}

class StaminaStat extends Stat {
    static id = "stamina"; // Static id for StaminaStat

    constructor(baseValue: number = 100, decayRate: number = 0.02) {
        super(StaminaStat.id, baseValue, decayRate);  // Pass static id to the parent constructor
    }
}

class AttackStat extends Stat {
    static id = "attack"; // Static id for AttackStat

    constructor(baseValue: number = 10) {
        super(AttackStat.id, baseValue, 0);  // Pass static id to the parent constructor (no decay)
    }
}

class DefenseStat extends Stat {
    static id = "defense"; // Static id for DefenseStat

    constructor(baseValue: number = 5) {
        super(DefenseStat.id, baseValue, 0);  // Pass static id to the parent constructor (no decay)
    }
}

class AgilityStat extends Stat {
    static id = "agility"; // Static id for AgilityStat

    constructor(baseValue: number = 10) {
        super(AgilityStat.id, baseValue, 0);  // Pass static id to the parent constructor (no decay)
    }
}

class IntelligenceStat extends Stat {
    static id = "intelligence"; // Static id for IntelligenceStat

    constructor(baseValue: number = 10) {
        super(IntelligenceStat.id, baseValue, 0);  // Pass static id to the parent constructor (no decay)
    }
}

class StrengthStat extends Stat {
    static id = "strength"; // Static id for StrengthStat

    constructor(baseValue: number = 10) {
        super(StrengthStat.id, baseValue, 0);  // Pass static id to the parent constructor (no decay)
    }
}

class MagicResistanceStat extends Stat {
    static id = "magicResistance"; // Static id for MagicResistanceStat

    constructor(baseValue: number = 5) {
        super(MagicResistanceStat.id, baseValue, 0);  // Pass static id to the parent constructor (no decay)
    }
}

class PhysicalResistanceStat extends Stat {
    static id = "physicalResistance"; // Static id for PhysicalResistanceStat

    constructor(baseValue: number = 5) {
        super(PhysicalResistanceStat.id, baseValue, 0);  // Pass static id to the parent constructor (no decay)
    }
}

class CriticalHitChanceStat extends Stat {
    static id = "criticalHitChance"; // Static id for CriticalHitChanceStat

    constructor(baseValue: number = 0.1) {
        super(CriticalHitChanceStat.id, baseValue, 0);  // Pass static id to the parent constructor (no decay)
    }
}

class HealthRegenStat extends Stat {
    static id = "healthRegen"; // Static id for HealthRegenStat

    constructor(baseValue: number = 0, decayRate: number = 0.01) {
        super(HealthRegenStat.id, baseValue, decayRate);  // Pass static id to the parent constructor
    }
}

class ManaRegenStat extends Stat {
    static id = "manaRegen"; // Static id for ManaRegenStat

    constructor(baseValue: number = 0, decayRate: number = 0.01) {
        super(ManaRegenStat.id, baseValue, decayRate);  // Pass static id to the parent constructor
    }
}

class ExperienceStat extends Stat {
    static id = "experience"; // Static id for ExperienceStat

    constructor(baseValue: number = 0) {
        super(ExperienceStat.id, baseValue, 0);  // Pass static id to the parent constructor (no decay)
    }
}

class ViewRadius extends Stat {
    static id = "viewRadius";
    private _size: Size


    constructor(size: Size, viewRadius: number = 100) {
        super(ViewRadius.id, viewRadius);
        this._size = size;
    }

    get value(): number {
        const t = super.value;
        return this.scale(t);
    }

    get baseValue(): number {
        const t = super.baseValue;
        return this.scale(t);
    }

    scale(value: number) {
        return value * (1 + this._size.value / 100);
    }
}

class MovementSpeed extends GrowingStat {
    static id = "movementSpeed";
    private _sizeStat: Size;
    constructor(sizeStat: Size, maxMovementSpeed: number = 0.1) {
        super(MovementSpeed.id, maxMovementSpeed, 0);
        this._sizeStat = sizeStat;
    }

    get value(): number {
        const t = super.value;
        return this.scale(t);
    }

    get baseValue(): number {
        const t = super.baseValue;
        return this.scale(t);
    }

    scale(value: number) {
        return value * (9.81 / this._sizeStat.value);
    }
}

class HungerStat extends GrowingStat {
    static id = "hunger";
    _movementSpeed: MovementSpeed;

    constructor(movementSpeed: MovementSpeed, baseValue: number = 100) {
        super(HungerStat.id, baseValue, 0.002);
        this._movementSpeed = movementSpeed;
    }

    applyDecay(deltaTime: number): void {
        const decay = this.decayRate;
        const deltaDecay = decay * deltaTime;

        const hungerFactor = 0.2;
        const movementSpeed = this._movementSpeed.value;
        const movementHunger = movementSpeed * hungerFactor;
        const deltaMovementHunger = movementHunger * deltaTime;

        const sum = deltaDecay + deltaMovementHunger;

        this._value += sum;

        if (this._value > this.baseValue) {
            this._value = this.baseValue;
        }
    }


    scale(value: number) {
        return value * (9.81 / this._movementSpeed.value);
    }
}

class Size extends Stat {
    static id = "size";
    constructor(size: number = 5 + Math.random() * 50) {
        super(Size.id, size, 0);
    }
}

export {
    HealthStat,
    DurabilityStat,
    ManaStat,
    StaminaStat,
    AttackStat,
    DefenseStat,
    AgilityStat,
    IntelligenceStat,
    StrengthStat,
    MagicResistanceStat,
    PhysicalResistanceStat,
    CriticalHitChanceStat,
    HealthRegenStat,
    ManaRegenStat,
    ExperienceStat,
    HungerStat,
    FoodItemCount,
    ViewRadius,
    MovementSpeed,
    Size
};
