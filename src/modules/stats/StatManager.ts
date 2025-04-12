import {Stat} from './Stat';
import {EventBus} from "../eventbus/EventBus";
import {RuleManager} from "../rules/RuleManager";

class StatsManager {
    private _eventBus: EventBus = EventBus.getInstance();

    constructor() {

    }

    private _stats: Map<string, Stat> = new Map(); // Use a Map to store stats by id

    // Get all stats
    get stats() {
        return Array.from(this._stats.values()); // Return stats as an array
    }

    protected _statRuleManager: RuleManager<Stat, StatsManager> = new RuleManager<Stat, StatsManager>();

    get statRuleManager(): RuleManager<Stat, StatsManager> {
        return this._statRuleManager;
    }

    // Add a stat to the manager (only if a stat with the same id doesn't exist)
    addStat(stat: Stat): void {
        if (!this._stats.has(stat.id)) { // Check if the stat already exists
            this._stats.set(stat.id, stat); // Add the stat to the Map
        }
    }

    // Update all stats
    update(deltaTime: number): void {
        this._stats.forEach((stat) => {
            stat.update(deltaTime);

            this._statRuleManager.evaluateAll(stat, this);

            this._eventBus.emit<Stat>("stat-change-" + stat.id, stat);

            // Emit an event when the stat reaches full value
            if (stat.isFull()) {
                this._eventBus.emit<Stat>("stat-full-" + stat.id, stat);
            }

            if (stat.isEmpty()) {
                this._eventBus.emit<Stat>("stat-empty-" + stat.id, stat);
            }
        });
    }

    // Get a stat by id
    getStatById(id: string): Stat | undefined {
        return this._stats.get(id); // Use Map's get method to retrieve the stat by id
    }

    // Reset all stats
    resetStats(): void {
        this._stats.forEach((stat) => stat.reset());
    }

    // Get the value of a specific stat by id
    getStatValue(id: string): number | undefined {
        const stat = this.getStatById(id);
        return stat ? stat.value : undefined;
    }

    // Add a modifier to a stat's base value
    addStatBaseValueModifier(id: string, modifierKey: string, modifierValue: number): void {
        const stat = this.getStatById(id);
        if (stat) {
            stat.addBaseValueModifier(modifierKey, modifierValue);
        }
    }

    // Add a modifier to a stat's decay rate
    addStatDecayRateModifier(id: string, modifierKey: string, modifierValue: number): void {
        const stat = this.getStatById(id);
        if (stat) {
            stat.addDecayRateModifier(modifierKey, modifierValue);
        }
    }
}

export {StatsManager};
