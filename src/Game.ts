import {ButtonIds, CanvasId, DivIds} from "./constants";

export default class Game {
    private  _getButton(buttonId: string): HTMLButtonElement {
        const button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("#" + buttonId);
        if(button) {
            return button;
        } else {
            throw new Error("Can't find a required button with id " + buttonId);
        }
    }

    get game(): HTMLDivElement {
        const game: HTMLDivElement | null = document.querySelector<HTMLDivElement>("#" + DivIds.Game);
        if(game) {
            return game;
        } else {
            throw new Error("Can't find a required div with id " + DivIds.Game);
        }
    }

     get buttonPlay(): HTMLButtonElement {
        return this._getButton(ButtonIds.ControllerPlay);
    }

    get buttonSpawn(): HTMLButtonElement {
        return this._getButton(ButtonIds.ControllerSpawn);
    }

     get buttonPause(): HTMLButtonElement {
        return this._getButton(ButtonIds.ControllerPause);
    }

     get buttonNext(): HTMLButtonElement {
        return this._getButton(ButtonIds.ControllerNext);
    }

     get buttonReload(): HTMLButtonElement {
        return this._getButton(ButtonIds.ControllerReload);
    }

     get canvas(): HTMLCanvasElement {
        const canvas: HTMLCanvasElement | null = document.querySelector<HTMLCanvasElement>("#" + CanvasId);
        if(canvas) {
            return canvas;
        } else {
            throw new Error("there was an error trying to get the canvas element with id<" + CanvasId + ">. This is required to display the View!");
        }
    }
}

