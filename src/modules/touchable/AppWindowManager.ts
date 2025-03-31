import {AppWindow} from "./AppWindow";

class AppWindowManager {
    _windows: AppWindow[];

    constructor() {
        this._windows = [];
    }

    addWindow(window: AppWindow) {
        this._windows.push(window);
        document.body.appendChild(window.windowDiv);
    }
}

export {AppWindowManager};