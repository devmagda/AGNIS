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

    update(): void {
        this._data.forEach(e => e.update());
    }

    add(entity: ModelEntity): void {
        this._data.set(entity.id, entity);
    }

    clear() {
        this._data = new Map();
    }

    static defaultConfig() {
        const model = new Model();
        model.add(new ModelEntity(IDGen.getId("entity")));
        return model;
    }

    static empty() {
        return new Model();
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

    update() {
        console.warn('No update function implemented', this);
    }
}

export {Model, ModelEntity};