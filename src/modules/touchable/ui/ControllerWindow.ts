import {ButtonWindow} from "./ButtonWindow";
import Game from "../../../Game";
import Entity from "../../../entities/Entity";
import VectorUtil from "../../math/vectors/VectorUtil";
import {AppWindowUtil} from "../AppWindowUtil";
import {IDGen} from "../../math/IdGen";

class ControllerWindow extends ButtonWindow {
    constructor(game: Game) {
        super(ControllerWindow.getButtons(game), ["controller-window"]);
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
            model.add(new Entity(IDGen.getId("entity"),  VectorUtil.getRandom(VectorUtil.canvasSize())));
            view.update(model);
        });

        return [playButton, pauseButton, nextButton, reloadButton, spawnButton];
    }

    protected _createHeaderDiv(title: string): HTMLDivElement {
        const classList = [
            "app-window",
            "header"
        ];
        const headerDiv = AppWindowUtil.createDiv(IDGen.getId("header"), {}, classList);

        const titleElement = AppWindowUtil.createTitle(title, "p", {});
        const minimizeButton = AppWindowUtil.createButton("_", () => this._toggleMinimize());

        headerDiv.appendChild(titleElement);
        headerDiv.appendChild(minimizeButton);

        return headerDiv;
    }
}

export {ControllerWindow};