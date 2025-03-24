import { Vector2D } from "../math/vectors/Vectors";
import {Model, ModelEntity} from "./Model";
import View from "./View";

export default class Controller {
    _model: Model;
    _view: View;

    constructor() {
        this._model = new Model();
        this._view = new View();
    }

    get model() {
        return this._model;
    }

    get view() {
        return this._view;
    }

    update(): void {
        this.model.update();
        this.view.update(this.model);
    }

    static defaultConfig(): Controller {
        const defaultController = new Controller();
        defaultController._model.add(new ModelEntity(1, new Vector2D(0, 0)));
        return defaultController;
    }
}