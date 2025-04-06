import {Stat} from "./Stat";
import {RuleBuilder} from "../rules/RuleBuilder";
import {HealthStat, HungerStat} from "./StatLib";
import {StatsManager} from "./StatManager";

const healthHungerRuleName = "health-hunger"
const healthHungerModifierName = "mn-" + healthHungerRuleName + "-modifier";

const healthHungerActivate = (manager: StatsManager) => {
    const healthStat = manager.getStatByName(HealthStat.id);
    healthStat?.addDecayRateModifier(healthHungerModifierName, 0.01);
};

const healthHungerDeactivate = (manager: StatsManager) => {
    const healthStat = manager.getStatByName(HealthStat.id);
    healthStat?.removeDecayRateModifier(healthHungerModifierName);
};

export const HealthHungerRule = new RuleBuilder<Stat, StatsManager>(healthHungerRuleName)
    .addTypeCondition((stat: Stat) => stat.name === HungerStat.id)
    .addCondition((stat: Stat) => stat.isFull())
    .onActivate(healthHungerActivate)
    .onDeactivate(healthHungerDeactivate)
    .build();
