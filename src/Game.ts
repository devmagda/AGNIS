import {AppWindowManager} from "./modules/touchable/AppWindowManager";
import Controller from "./modules/mvc/Controller";
import {ViewCanvas} from "./modules/mvc/View";
import {ControllerWindow} from "./modules/touchable/ui/ControllerWindow";
import {AppWindowUtil} from "./modules/touchable/AppWindowUtil";
import {InputManager} from "./modules/inputs/InputManager";
import {Food} from "./entities/Food";
import {IDGen} from "./modules/math/IdGen";
import Vector2D from "./modules/math/vectors/Vector2D";

export default class Game {
    lastId = 0;
    _windowManager: AppWindowManager;
    _controller: Controller;
    _isPlaying = false;
    _lastFrameTime = 0;
    _inputManager: InputManager;
    constructor() {
        const canvas = AppWindowUtil.createGameCanvas('game_canvas', window.innerWidth, window.innerHeight);
        document.body.appendChild(canvas);

        this._controller = new Controller(new ViewCanvas(canvas));
        this._windowManager = new AppWindowManager();
        this._windowManager.addWindow(new ControllerWindow(this));

        this._inputManager = InputManager.instance;

        this._inputManager.addMousemove((event: MouseEvent) => {
            this._controller.model.add(new Food(IDGen.getId("food"), new Vector2D(event.clientX, event.clientY)));
            this._controller.view.update(this._controller.model);
        });

    }

    gameLoop(timestamp: number) {
        if (!this._isPlaying) return; // Pause the loop if not playing

        const deltaTime = timestamp - this._lastFrameTime;
        this._lastFrameTime = timestamp;

        this._controller.update(deltaTime); // Update game state

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    get controller() {
        return this._controller;
    }

    get windowManager() {
        return this._windowManager;
    }

    get isPlaying() {
        return this._isPlaying;
    }

    set isPlaying(isPlaying: boolean) {
        this._isPlaying = isPlaying;
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

