import {AppWindow} from "../AppWindow";
import Controller from "../../mvc/Controller";

class ButtonWindow extends AppWindow {
    constructor(buttons: HTMLButtonElement[], classList: string[] = []) {
        super("Controller Window", 400, 300);
        buttons.forEach((button: HTMLButtonElement) => {
            classList.forEach(item => button.classList.add(item));
            this._contentDiv.appendChild(button);
        });
    }

    protected _setContent(contentDiv: HTMLDivElement): void {

    }
}

export {ButtonWindow};
