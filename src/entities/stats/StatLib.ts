// StatLib.ts - A collection of common stats for games
import {Stat} from "../../modules/stats/Stat";
import {GrowingStat} from "../../modules/stats/GrowingStat";

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

class HungerStat extends GrowingStat {
    static id = "hunger";

    constructor(baseValue: number = 100) {
        super(HungerStat.id, baseValue, 0.01);
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
    FoodItemCount
};
