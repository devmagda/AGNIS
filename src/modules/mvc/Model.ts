import {Vector2D} from "../math/vectors/Vectors";

class Model {
    _data: Map<number, ModelEntity>;

    constructor() {
        this._data = new Map();
    }

    get data() {
        return this._data;
    }

    update(): void {
        this._data.forEach(e => e.update());
    }

    add(entity: ModelEntity): void {
        const count = this._data.size;
        this._data.set(entity.id, entity);
    }
}

class ModelEntity {
    _id: number;
    _position: Vector2D;


    constructor(id: number, position: Vector2D) {
        this._id = id;
        this._position = position;
    }

    get id(): number {
        return this._id;
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