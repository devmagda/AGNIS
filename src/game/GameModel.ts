import {Model} from "../modules/mvc/Model";
import {EventBus} from "../modules/eventbus/EventBus";
import {WorldQuerySystem} from "./world/WorldQuerySystem";

class GameModel extends Model {
    _eventBus : EventBus;
    constructor() {
        super();
        this._eventBus = EventBus.getInstance();
        WorldQuerySystem.initialize(this);
    }

    update(delta: number): void {
        super.update(delta);

    }

    filterById(id: string): void {
        this.getFilteredValues((e) => e.id === id);
    }
}

export {GameModel};