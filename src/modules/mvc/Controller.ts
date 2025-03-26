import {View} from "./View";
import {Model} from "./Model";

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
        this._model.update();
        this._view.update(this._model);
    }

    reload(): void {
        this._model.clear();
        this._view.update(this._model);
    }

    static defaultConfig(view: View): Controller {
        const defaultController = new Controller(view);
        defaultController.model = Model.defaultConfig();
        defaultController.view.update(defaultController.model);
        return defaultController;
    }

    updateRender(): void {
        this._view.update(this._model);
    }
}