import {Drawable} from "./View";
import {IDGen} from "../math/IdGen";

class Model {
    _data: Map<string, ModelEntity>;
    constructor() {
        this._data = new Map();
    }

    reload() {
        this._data = new Map();
    }

    get data() {
        return this._data;
    }

    update(deltaTime: number): void {
        this._data.forEach(e => e.update(deltaTime));
        this.removeDeadEntities();
    }

    add(entity: ModelEntity): void {
        this._data.set(entity.id, entity);
    }

    clear() {
        this._data = new Map();
    }

    static empty() {
        return new Model();
    }

    private removeDeadEntities(): void {
        this._data.forEach((entity, id) => {
            if (!entity.isAlive) {
                this._data.delete(id);
            }
        });
    }
}

class ModelEntity implements Drawable {
    _id: string;
    constructor(id: string) {
        this._id = id;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const errorMessage = 'ModelEntity should never be initiated directly!';
        console.error(errorMessage, this);
        throw new Error(errorMessage);
    }

    get id() {
        return this._id;
    }

    update(deltaTime: number) {
        console.warn('No update function implemented', this, deltaTime);
    }

    get isAlive() {
        console.warn("Calling isAlive on ModelEntity instance, objects should not be initialized directly!");
        return false;
    }
}

export {Model, ModelEntity};