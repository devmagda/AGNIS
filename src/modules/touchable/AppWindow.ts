import {AppWindowUtil} from "./AppWindowUtil";

class AppWindow {
    protected _id: string;
    private _width: number;
    private _height: number;
    private _windowDiv: HTMLDivElement;
    protected _contentDiv: HTMLDivElement;

    constructor(title: string, width: number = 300, height: number = 200, x: number = 10, y: number = 10, contentDivClassNames: string[] = []) {
        this._id = `win_${Math.random().toString(36).substr(2, 9)}`;
        this._width = width;
        this._height = height;
        this._contentDiv = this._createContentDiv(contentDivClassNames);

        this._windowDiv = this._createWindowDiv(x, y);
        this._windowDiv.appendChild(this._createHeaderDiv(title));
        this._windowDiv.appendChild(this._contentDiv);

        document.body.appendChild(this._windowDiv);
        this.makeWindowDraggable();
    }

    get windowDiv(): HTMLDivElement {
        return this._windowDiv;
    }

    private _createWindowDiv(x: number, y: number): HTMLDivElement {
        const classList = [
            "app-window",
        ];
        return AppWindowUtil.createDiv(`window_${this._id}`, {}, classList);
    }

    protected _createHeaderDiv(title: string): HTMLDivElement {
        const classList = [
            "app-window",
            "header"
        ];
        const headerDiv = AppWindowUtil.createDiv(`header_${this._id}`, {}, classList);

        const titleElement = AppWindowUtil.createTitle(title, "p", {});
        const minimizeButton = AppWindowUtil.createButton("_", () => this._toggleMinimize());
        const closeButton = AppWindowUtil.createButton("X", () => this._closeWindow());

        headerDiv.appendChild(titleElement);
        headerDiv.appendChild(minimizeButton);
        headerDiv.appendChild(closeButton);

        return headerDiv;
    }

    private _createContentDiv(contentDivClassNames: string[]): HTMLDivElement {
        contentDivClassNames.push("app-window");
        contentDivClassNames.push("content");

        const contentDiv = AppWindowUtil.createDiv(`content_${this._id}`, {}, contentDivClassNames);

        this._setContent(contentDiv);
        return contentDiv;
    }

    protected _setContent(contentDiv: HTMLDivElement): void {
        contentDiv.textContent = "Inner content goes here...";
    }

    protected _toggleMinimize(): void {
        const hiddenClassName = "hide";

        if(this._contentDiv.classList.contains(hiddenClassName)) {
            this._contentDiv.classList.remove(hiddenClassName);
        } else {
            this._contentDiv.classList.add(hiddenClassName);
        }}

    private _closeWindow(): void {
        this._windowDiv.remove();
    }

    public makeWindowDraggable() {
        let isDragging = false;
        let offsetX: number, offsetY: number;

        this._windowDiv.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - this._windowDiv.offsetLeft;
            offsetY = e.clientY - this._windowDiv.offsetTop;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                this._windowDiv.style.left = `${e.clientX - offsetX}px`;
                this._windowDiv.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }
}
export {AppWindow};