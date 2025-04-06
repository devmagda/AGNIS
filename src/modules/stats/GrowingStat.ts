import {Stat} from "./Stat";

class GrowingStat extends Stat {
    constructor(name: string, baseValue: number, decayRate: number = 0) {
        super(name, baseValue, decayRate);
        this._value = 0;  // Start from 0 instead of baseValue
    }

    // Override the applyDecay method to grow the stat value over time
    applyDecay(deltaTime: number): void {
        if (this.decayRate !== 0) {
            this._value += this.decayRate * deltaTime;
            if (this._value > this.baseValue) this._value = this.baseValue;
        }
    }

}

export {GrowingStat};
