import { Stat } from './Stat';
import {EventBus} from "../eventbus/EventBus";

class StatsManager {
    private _stats: Stat[] = [];
    private _eventBus: EventBus = EventBus.getInstance();

    constructor() {
    }

    // Get all stats
    get stats() {
        return this._stats;
    }

    // Add a stat to the manager
    addStat(stat: Stat): void {
        this._stats.push(stat);
    }

    // Update all stats
    update(deltaTime: number): void {
        this._stats.forEach(stat => {
            stat.update(deltaTime);

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
        return this._stats.find(stat => stat["name"] === name);
    }

    // Remove a stat by name
    removeStatByName(name: string): void {
        this._stats = this._stats.filter(stat => stat["name"] !== name);
    }

    // Reset all stats (optional: useful if you want to reset the game or stats)
    resetStats(): void {
        this._stats.forEach(stat => stat.reset());
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

export { StatsManager };
