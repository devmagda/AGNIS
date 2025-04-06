import {View} from "./View";
import {Model} from "./Model";
import {EventBus} from "../eventbus/EventBus";
import {EventNames} from "../eventbus/EventNames";
import Entity from "../../entities/Entity";
import Vector2D from "../math/vectors/Vector2D";
import {IDGen} from "../math/IdGen";
import {Food} from "../../entities/Food";

export default class Controller {
    _model: Model;
    _view: View;

    constructor(view: View) {
        this._model = Model.empty();
        this._view = view;

        EventBus.getInstance().on<MouseEvent>(EventNames.MouseClick, (event: MouseEvent) => {
           this._model.add(new Food(IDGen.getId("food"), new Vector2D(event.clientX, event.clientY)));
           this._view.update(this._model);
        });
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

    update(deltaTime: number): void {
        this._model.update(deltaTime);
        this._view.update(this._model);
    }

    reload(): void {
        this._model.clear();
        this._view.update(this._model);
    }

    static defaultConfig(view: View): Controller {
        const defaultController = new Controller(view);
        defaultController.model = new Model();
        defaultController.view.update(defaultController.model);
        return defaultController;
    }

    updateRender(): void {
        this._view.update(this._model);
    }
}