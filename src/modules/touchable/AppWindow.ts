import {AppWindowUtil} from "./AppWindowUtil";

class AppWindow {
    private _id: string;
    private _width: number;
    private _height: number;
    private _windowDiv: HTMLDivElement;
    protected _contentDiv: HTMLDivElement;

    constructor(title: string, width: number = 300, height: number = 200, x: number = 10, y: number = 10) {
        this._id = `win_${Math.random().toString(36).substr(2, 9)}`;
        this._width = width;
        this._height = height;
        this._contentDiv = this._createContentDiv();

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
        const w = AppWindowUtil.createDiv(`window_${this._id}`, {
            border: "1px solid black",
            width: `${this._width}px`,
            height: `${this._height}px`,
            backgroundColor: "white",
            position: "absolute",
            top: `${y}px`,
            left: `${x}px`,
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)"
        });
        return w;
    }

    private _createHeaderDiv(title: string): HTMLDivElement {
        const headerDiv = AppWindowUtil.createDiv(`header_${this._id}`, {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#ddd",
            padding: "5px",
            cursor: "move"
        });

        const titleElement = AppWindowUtil.createTitle(title, "p", { margin: "0" });
        const minimizeButton = AppWindowUtil.createButton("Minimize", () => this._toggleMinimize());
        const closeButton = AppWindowUtil.createButton("Close", () => this._closeWindow());

        headerDiv.appendChild(titleElement);
        headerDiv.appendChild(minimizeButton);
        headerDiv.appendChild(closeButton);

        return headerDiv;
    }

    private _createContentDiv(): HTMLDivElement {
        const contentDiv = AppWindowUtil.createDiv(`content_${this._id}`, {
            padding: "10px",
            height: `${this._height - 40}px`,
            overflow: "auto"
        });

        this._setContent(contentDiv);
        return contentDiv;
    }

    protected _setContent(contentDiv: HTMLDivElement): void {
        contentDiv.textContent = "Inner content goes here...";
    }

    private _toggleMinimize(): void {
        this._contentDiv.style.display = this._contentDiv.style.display === "none" ? "block" : "none";
    }

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