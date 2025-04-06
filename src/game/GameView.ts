import {ViewCanvas} from "../modules/mvc/View";
import {GameController} from "./GameController";

class GameView extends ViewCanvas {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }
}

export {GameView};