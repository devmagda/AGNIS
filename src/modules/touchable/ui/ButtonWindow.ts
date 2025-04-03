import {AppWindow} from "../AppWindow";
import {AppWindowUtil} from "../AppWindowUtil";

class ButtonWindow extends AppWindow {
    constructor(buttons: HTMLButtonElement[], classList: string[] = []) {
        super("Controller Window", 400, 300);
        const buttonContainerDiv = AppWindowUtil.createButtonContainer(`button_window_${this._id}`, buttons);
        this._contentDiv.appendChild(buttonContainerDiv);
    }
    protected _setContent(contentDiv: HTMLDivElement): void {
    }
}

export {ButtonWindow};
