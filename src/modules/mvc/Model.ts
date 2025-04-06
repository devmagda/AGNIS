import {Drawable} from "./View";

class Model {
    constructor() {
        this._data = new Map();
    }

    _data: Map<string, ModelEntity>;

    get data() {
        return this._data;
    }

    static empty() {
        return new Model();
    }

    reload() {
        this._data = new Map();
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

    private removeDeadEntities(): void {
        this._data.forEach((entity, id) => {
            if (!entity.isAlive) {
                this._data.delete(id);
            }
        });
    }
}

class ModelEntity implements Drawable {
    constructor(id: string) {
        this._id = id;
    }

    _id: string;

    get id() {
        return this._id;
    }

    get isAlive() {
        console.warn("Calling isAlive on ModelEntity instance, objects should not be initialized directly!");
        return true;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const errorMessage = 'ModelEntity should never be initiated directly!';
        console.error(errorMessage, this);
        throw new Error(errorMessage);
    }

    update(deltaTime: number) {
        console.warn('No update function implemented', this, deltaTime);
    }
}

export {Model, ModelEntity};