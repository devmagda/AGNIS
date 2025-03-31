import {ButtonWindow} from "./ButtonWindow";
import Game from "../../../Game";
import Entity from "../../../entities/Entity";
import VectorUtil from "../../math/vectors/VectorUtil";
import {AppWindowUtil} from "../AppWindowUtil";

class ControllerWindow extends ButtonWindow {
    constructor(game: Game) {
        super(ControllerWindow.getButtons(game));
    }

    static getButtons(game: Game) {
        const playButton = AppWindowUtil.createButton("Play", () => {
            game.start();
        });
        const pauseButton = AppWindowUtil.createButton("Pause", () => {
            game.stop();
        });
        const nextButton = AppWindowUtil.createButton("Next", () => {
            game.controller.update();
        });
        const reloadButton = AppWindowUtil.createButton("Reload", () => {
            game.controller.reload();
        });
        const spawnButton = AppWindowUtil.createButton("Spawn", () => {
            const model = game.controller.model;
            const view = game.controller.view;
            model.add(new Entity(++game.lastId,  VectorUtil.getRandom(VectorUtil.canvasSize())));
            view.update(model);
        });

        return [playButton, pauseButton, nextButton, reloadButton, spawnButton];
    }
}

export {ControllerWindow};