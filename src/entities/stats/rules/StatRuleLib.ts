import {Stat} from "../../../modules/stats/Stat";
import {RuleBuilder} from "../../../modules/rules/RuleBuilder";
import {HealthStat, HungerStat} from "../StatLib";
import {StatsManager} from "../../../modules/stats/StatManager";

const healthHungerRuleName = "health-hunger"
const healthHungerModifierName = "mn-" + healthHungerRuleName + "-modifier";

const healthHungerActivate = (manager: StatsManager) => {
    const healthStat = manager.getStatById(HealthStat.id);
    healthStat?.addDecayRateModifier(healthHungerModifierName, 0.01);
};

const healthHungerDeactivate = (manager: StatsManager) => {
    const healthStat = manager.getStatById(HealthStat.id);
    healthStat?.removeDecayRateModifier(healthHungerModifierName);
};

export const HealthHungerRule = new RuleBuilder<Stat, StatsManager>(healthHungerRuleName)
    .addTypeCondition((stat: Stat) => stat.id === HungerStat.id)
    .addCondition((stat: Stat) => stat.isFull())
    .onActivate(healthHungerActivate)
    .onDeactivate(healthHungerDeactivate)
    .build();
