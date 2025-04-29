class Stat {
    // Modifiers for base value and decay rate (stored separately)
    private _baseValueModifiers: Map<string, number>;
    private _decayRateModifiers: Map<string, number>;

    constructor(id: string, baseValue: number, decayRate: number = 0) {
        this._id = id;
        this._baseValue = baseValue;
        this._value = baseValue;  // Initially, the value is set to baseValue
        this._decayRate = decayRate;
        this._baseValueModifiers = new Map();
        this._decayRateModifiers = new Map();
    }

    private readonly _id: string;

    get id() {
        return this._id;
    }

    protected _value: number;

    // Getter for the stat value (can be used for current value, e.g., health)
    get value() {
        return this._value;
    }

    private _baseValue: number;

    // Getters for the base value and decay rate with modifiers applied
    get baseValue() {
        // Apply all base value modifiers when retrieving baseValue
        return this._baseValue + Array.from(this._baseValueModifiers.values()).reduce((sum, modifier) => sum + modifier, 0);
    }

    private _decayRate: number;

    get decayRate() {
        // Apply all decay rate modifiers when retrieving decayRate
        return this._decayRate + Array.from(this._decayRateModifiers.values()).reduce((sum, modifier) => sum + modifier, 0);
    }

    // Getter for the "full" value (base value + all modifiers)
    get fullValue() {
        return this.baseValue;  // Full value is essentially the base value after applying all modifiers
    }

    // Getter for the factor of the stat value compared to its full value (a decimal between 0 and 1)
    get factor(): number {
        return this._value / this.fullValue;
    }

    get percentage(): number {
        return this.factor * 100;
    }

    // Apply a modifier to the base value (it will not directly change the base value, just tracked as a modifier)
    addBaseValueModifier(name: string, value: number): void {
        this._baseValueModifiers.set(name, value);
    }

    // Apply a modifier to the decay rate (it will not directly change the decay rate, just tracked as a modifier)
    addDecayRateModifier(name: string, value: number): void {
        this._decayRateModifiers.set(name, value);
    }

    // Remove a modifier from the base value
    removeBaseValueModifier(name: string): void {
        this._baseValueModifiers.delete(name);
    }

    // Remove a modifier from the decay rate
    removeDecayRateModifier(name: string): void {
        this._decayRateModifiers.delete(name);
    }

    // Apply decay over time (decreases the stat value)
    applyDecay(deltaTime: number): void {
        if (this.decayRate !== 0) {
            this._value -= this.decayRate * deltaTime;
            if (this._value < 0) this._value = 0;  // Prevent the value from going below 0
        }
    }

    // Update the stat, typically used for buffs, debuffs, or other systems
    update(deltaTime: number): void {
        this.applyDecay(deltaTime);
    }

    // Check if the stat is empty (e.g., health = 0, stamina = 0)
    isEmpty(): boolean {
        return this._value <= 0;
    }

    // Check if the stat is full (e.g., health = full, stamina = full)
    isFull(): boolean {
        return this._value >= this.fullValue;
    }

    // Debug helper to inspect the stat's current state
    debug(): string {
        return `Stat ${this._id}: value=${this._value}, baseValue=${this.baseValue}, decayRate=${this.decayRate}`;
    }

    reset() {
        this._value = this.baseValue;
    }

    add(value: number): void {
        this._value += value;
        if(this._value > this.baseValue) {
            this.reset();
        }
    }

    subtract(value: number) {
        this.add(-value);
    }
}

export {Stat};
