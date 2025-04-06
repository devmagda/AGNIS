import {View} from "./View";
import {Model} from "./Model";

export default class Controller {
    constructor(view: View, model: Model) {
        this._model = model;
        this._view = view;
    }

    _model: Model;

    get model() {
        return this._model;
    }

    set model(model: Model) {
        this._model = model;
    }

    _view: View;

    get view() {
        return this._view;
    }

    update(deltaTime: number): void {
        this._model.update(deltaTime);
        this._view.update(this._model);
    }

    reload(): void {
        this._model.clear();
        this._view.update(this._model);
    }

    updateRender(): void {
        this._view.update(this._model);
    }
}