type EventCallback<T = any> = (payload: T) => void;

type EventMap = {
    [event: string]: EventCallback<any>[];
};

class EventBus {
    private static instance: EventBus;
    private events: EventMap = {};

    // Private constructor to prevent instantiation
    private constructor() {}

    // Static method to get the singleton instance
    public static getInstance(): EventBus {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }

    reset(): void {
        this.events = {};
    }

    // Subscribe to an event
    on<T = any>(event: string, callback: EventCallback<T>): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    // Unsubscribe from an event
    off<T = any>(event: string, callback: EventCallback<T>): void {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(cb => cb !== callback);
    }

    // Emit an event
    emit<T = any>(event: string, payload: T): void {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => callback(payload));
    }
}

export { EventBus };
