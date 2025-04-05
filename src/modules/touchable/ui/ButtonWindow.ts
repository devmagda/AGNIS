import {AppWindow} from "../AppWindow";
import {AppWindowUtil} from "../AppWindowUtil";
import {IDGen} from "../../math/IdGen";

class ButtonWindow extends AppWindow {
    constructor(buttons: HTMLButtonElement[], classList: string[] = []) {
        super("Controller Window", 400, 300);
        const buttonContainerDiv = AppWindowUtil.createButtonContainer(IDGen.getId("button-window"), buttons);
        this._contentDiv.appendChild(buttonContainerDiv);
    }
    protected _setContent(contentDiv: HTMLDivElement): void {
    }
}

export {ButtonWindow};
