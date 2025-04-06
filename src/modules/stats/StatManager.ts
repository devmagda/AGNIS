import {Stat} from './Stat';
import {EventBus} from "../eventbus/EventBus";
import {RuleManager} from "../rules/RuleManager";

class StatsManager {
    private _eventBus: EventBus = EventBus.getInstance();

    constructor() {

    }

    private _stats: Map<string, Stat> = new Map(); // Use a Map to store stats by name

    // Get all stats
    get stats() {
        return Array.from(this._stats.values()); // Return stats as an array
    }

    protected _statRuleManager: RuleManager<Stat, StatsManager> = new RuleManager<Stat, StatsManager>();

    get statRuleManager(): RuleManager<Stat, StatsManager> {
        return this._statRuleManager;
    }

    // Add a stat to the manager (only if a stat with the same name doesn't exist)
    addStat(stat: Stat): void {
        if (!this._stats.has(stat.name)) { // Check if the stat already exists
            this._stats.set(stat.name, stat); // Add the stat to the Map
        }
    }

    // Update all stats
    update(deltaTime: number): void {
        this._stats.forEach((stat) => {
            stat.update(deltaTime);

            this._statRuleManager.evaluateAll(stat, this);

            this._eventBus.emit<Stat>("stat-change-" + stat.name, stat);

            // Emit an event when the stat reaches full value
            if (stat.isFull()) {
                this._eventBus.emit<Stat>("stat-full-" + stat.name, stat);
            }

            if (stat.isEmpty()) {
                this._eventBus.emit<Stat>("stat-empty-" + stat.name, stat);
            }
        });
    }

    // Get a stat by name
    getStatByName(name: string): Stat | undefined {
        return this._stats.get(name); // Use Map's get method to retrieve the stat by name
    }

    // Reset all stats
    resetStats(): void {
        this._stats.forEach((stat) => stat.reset());
    }

    // Get the value of a specific stat by name
    getStatValue(name: string): number | undefined {
        const stat = this.getStatByName(name);
        return stat ? stat.value : undefined;
    }

    // Add a modifier to a stat's base value
    addStatBaseValueModifier(name: string, modifierKey: string, modifierValue: number): void {
        const stat = this.getStatByName(name);
        if (stat) {
            stat.addBaseValueModifier(modifierKey, modifierValue);
        }
    }

    // Add a modifier to a stat's decay rate
    addStatDecayRateModifier(name: string, modifierKey: string, modifierValue: number): void {
        const stat = this.getStatByName(name);
        if (stat) {
            stat.addDecayRateModifier(modifierKey, modifierValue);
        }
    }
}

export {StatsManager};
