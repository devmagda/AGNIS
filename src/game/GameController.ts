import Game from "./Game";
import Controller from "../modules/mvc/Controller";
import {View} from "../modules/mvc/View";
import {GameView} from "./GameView";
import {GameModel} from "./GameModel";
import {EventBus} from "../modules/eventbus/EventBus";
import {EventNames} from "../modules/eventbus/EventNames";
import {Food} from "../entities/Food";
import {IDGen} from "../modules/math/IdGen";
import Vector2D from "../modules/math/vectors/Vector2D";

class GameController extends Controller {
    constructor(view: GameView, model: GameModel) {
        super(view, model);
        EventBus.getInstance().on<MouseEvent>(EventNames.MouseClick, (event: MouseEvent) => {
            this._model.add(new Food(new Vector2D(event.clientX, event.clientY)));
            this._view.update(this._model);
        });
        EventBus.getInstance().on<TouchEvent>(EventNames.TouchStart, (event: TouchEvent) => {
            const touch = event.touches[0];
            this._model.add(new Food(new Vector2D(touch.clientX, touch.clientY)));
            this._view.update(this._model);
        });
    }
}

export { GameController };