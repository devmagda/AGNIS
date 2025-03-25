import { Vector2D } from "../math/vectors/Vectors";
import {Model, ModelEntity} from "./Model";
import {View} from "./View";

export default class Controller {
    _model: Model;
    _view: View;

    constructor(view: View) {
        this._model = Model.empty();
        this._view = view;
    }

    set model(model: Model) {
        this._model = model;
    }

    get model() {
        return this._model;
    }

    get view() {
        return this._view;
    }

    update(): void {
        console.debug('Updating controller', this);
        this._model.update();
        this._view.update(this._model);
    }

    reload(): void {
        console.debug("Reloading controller", this);
        this._model = Model.defaultConfig();
        this._view.update(this._model);
    }

    static defaultConfig(view: View): Controller {
        const defaultController = new Controller(view);
        defaultController.model = Model.defaultConfig();
        defaultController.view.update(defaultController.model);
        return defaultController;
    }
}