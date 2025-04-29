import {AppWindowManager} from "../modules/touchable/AppWindowManager";
import Controller from "../modules/mvc/Controller";
import {ControllerWindow} from "../modules/touchable/ui/ControllerWindow";
import {AppWindowUtil} from "../modules/touchable/AppWindowUtil";
import {InputManager} from "../modules/inputs/InputManager";
import {Food} from "../entities/Food";
import {IDGen} from "../modules/math/IdGen";
import Vector2D from "../modules/math/vectors/Vector2D";
import {GameController} from "./GameController";
import {GameView} from "./GameView";
import {GameModel} from "./GameModel";

export default class Game {
    _lastFrameTime = 0;
    _inputManager: InputManager;

    constructor() {
        const canvas = AppWindowUtil.createGameCanvas('game_canvas', window.innerWidth, window.innerHeight);
        document.body.appendChild(canvas);

        this._controller = new GameController(new GameView(canvas), new GameModel());
        this._windowManager = new AppWindowManager();
        this._windowManager.addWindow(new ControllerWindow(this));

        this._inputManager = InputManager.instance;

        this._inputManager.addMousemove((event: MouseEvent) => {
            this._controller.model.add(new Food(new Vector2D(event.clientX, event.clientY)));
            this._controller.view.update(this._controller.model);
        });

    }

    _windowManager: AppWindowManager;

    get windowManager() {
        return this._windowManager;
    }

    _controller: Controller;

    get controller() {
        return this._controller;
    }

    _isPlaying = false;

    get isPlaying() {
        return this._isPlaying;
    }

    set isPlaying(isPlaying: boolean) {
        this._isPlaying = isPlaying;
    }

    gameLoop(timestamp: number) {
        if (!this._isPlaying) return; // Pause the loop if not playing

        const deltaTime = timestamp - this._lastFrameTime;
        this._lastFrameTime = timestamp;

        this._controller.update(deltaTime); // Update game state

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    start() {
        this._isPlaying = true;
        this._lastFrameTime = performance.now();
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    stop() {
        this._isPlaying = false;
    }
}

