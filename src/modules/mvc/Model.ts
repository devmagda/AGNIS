import {Vector2D} from "../math/vectors/Vectors";

class Model {
    _data: Map<number, ModelEntity>;

    _lastIdx: number;

    constructor() {
        this._data = new Map();
        this._lastIdx = 0;
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
        this._data.set(this._lastIdx++, entity);
    }

    static defaultConfig() {
        const model = new Model();
        model.add(new ModelEntity(new Vector2D(0, 0)));
        return model;
    }

    static empty() {
        return new Model();
    }
}

class ModelEntity {
    _position: Vector2D;


    constructor(position: Vector2D) {
        this._position = position;
    }

    get position() {
        return this._position;
    }

    set position(value: Vector2D) {
        this._position = value;
    }

    update(): void {
        this._position.x += 1;
        this._position.y += 1;
    }
}

export {Model, ModelEntity};