import {StatsManager} from "../../modules/stats/StatManager";
import {EventBus} from "../../modules/eventbus/EventBus";
import {Stat} from "../../modules/stats/Stat";

class StatsComponent {
    private _statsManager: StatsManager;

    constructor() {
        // Initialize the StatsManager with a reference to the EventBus
        this._statsManager = new StatsManager();
    }

    // Getter for accessing the StatsManager
    get statsManager(): StatsManager {
        return this._statsManager;
    }

    // Update all stats (typically called per frame or per game loop)
    update(deltaTime: number): void {
        this._statsManager.update(deltaTime);
    }

    // Listen to stat events (for full or empty stat conditions)
    listenToStatEvents(): void {
        const eventBus = EventBus.getInstance();

        eventBus.on('stat-full-health', (stat: Stat) => {
            console.log(`Health is full! Value: ${stat.value}`);
        });

        eventBus.on('stat-empty-health', (stat: Stat) => {
            console.log(`Health is empty! Value: ${stat.value}`);
        });

        // Add more event listeners as needed
    }

    // Debug method to display stats
    debug(): string {
        return this._statsManager.stats.map(stat => stat.debug()).join('\n');
    }
}

export { StatsComponent };
