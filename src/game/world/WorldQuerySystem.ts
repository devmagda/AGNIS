import { GameModel } from "../GameModel";
import {Food} from "../../entities/Food";
import {Monster} from "../../entities/Monster";

class WorldQuerySystem {
    private static _instance: WorldQuerySystem | null = null;
    private _model: GameModel;

    private constructor(model: GameModel) {
        this._model = model;
    }

    // Call this once to initialize the singleton
    static initialize(model: GameModel): void {
        if (this._instance) {
            throw new Error("WorldQuerySystem has already been initialized.");
        }
        this._instance = new WorldQuerySystem(model);
    }

    // Access the singleton instance
    static getInstance(): WorldQuerySystem {
        if (!this._instance) {
            throw new Error("WorldQuerySystem is not initialized. Call initialize() first.");
        }
        return this._instance;
    }

    // Optional: expose model if needed
    getModel(): GameModel {
        return this._model;
    }

    getFood(): Food[] {
        return this._model
            .getFilteredValues((entity) => entity instanceof Food)
            .map((entity) => entity as Food);
    }

    getMonsters(self: Monster): Monster[] {
        return this._model
            .getFilteredValues((entity) => entity instanceof Monster && entity != self)
            .map((entity) => entity as Monster);
    }
}

export { WorldQuerySystem };
