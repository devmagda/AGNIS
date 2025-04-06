import {AppWindowUtil} from "./AppWindowUtil";
import {IDGen} from "../math/IdGen";

class AppWindow {
    protected _id: string;
    protected _contentDiv: HTMLDivElement;
    private _width: number;
    private _height: number;

    constructor(title: string, width: number = 300, height: number = 200, x: number = 10, y: number = 10, contentDivClassNames: string[] = []) {
        this._id = IDGen.getId("win");
        this._width = width;
        this._height = height;
        this._contentDiv = this._createContentDiv(contentDivClassNames);

        this._windowDiv = this._createWindowDiv(x, y);
        this._windowDiv.appendChild(this._createHeaderDiv(title));
        this._windowDiv.appendChild(this._contentDiv);

        document.body.appendChild(this._windowDiv);
        this.makeWindowDraggable();
    }

    private _windowDiv: HTMLDivElement;

    get windowDiv(): HTMLDivElement {
        return this._windowDiv;
    }

    public makeWindowDraggable() {
        let isDragging = false;
        let offsetX: number, offsetY: number;

        // Add mouse event listeners
        this._windowDiv.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - this._windowDiv.offsetLeft;
            offsetY = e.clientY - this._windowDiv.offsetTop;
        });

        // Add touch event listeners
        this._windowDiv.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevents scrolling while dragging
            isDragging = true;
            const touch = e.touches[0];
            offsetX = touch.clientX - this._windowDiv.offsetLeft;
            offsetY = touch.clientY - this._windowDiv.offsetTop;
        });

        // Move window on mousemove or touchmove
        const moveHandler = (e: MouseEvent | TouchEvent) => {
            if (isDragging) {
                let clientX, clientY;

                if (e instanceof MouseEvent) {
                    clientX = e.clientX;
                    clientY = e.clientY;
                } else if (e instanceof TouchEvent && e.touches.length > 0) {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                }

                if (clientX !== undefined && clientY !== undefined) {
                    this._windowDiv.style.left = `${clientX - offsetX}px`;
                    this._windowDiv.style.top = `${clientY - offsetY}px`;
                }
            }
        };

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('touchmove', moveHandler);

        // Stop dragging on mouseup or touchend
        const stopDrag = () => {
            isDragging = false;
        };

        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }

    protected _createHeaderDiv(title: string): HTMLDivElement {
        const classList = [
            "app-window",
            "header"
        ];
        const headerDiv = AppWindowUtil.createDiv(IDGen.getId("header"), {}, classList);

        const titleElement = AppWindowUtil.createTitle(title, "p", {});
        const minimizeButton = AppWindowUtil.createButton("_", () => this._toggleMinimize());
        const closeButton = AppWindowUtil.createButton("X", () => this._closeWindow());

        headerDiv.appendChild(titleElement);
        headerDiv.appendChild(minimizeButton);
        headerDiv.appendChild(closeButton);

        return headerDiv;
    }

    protected _setContent(contentDiv: HTMLDivElement): void {
        contentDiv.textContent = "Inner content goes here...";
    }

    protected _toggleMinimize(): void {
        const hiddenClassName = "hide";

        if (this._contentDiv.classList.contains(hiddenClassName)) {
            this._contentDiv.classList.remove(hiddenClassName);
        } else {
            this._contentDiv.classList.add(hiddenClassName);
        }
    }

    private _createWindowDiv(x: number, y: number): HTMLDivElement {
        const classList = [
            "app-window",
        ];
        return AppWindowUtil.createDiv(IDGen.getId("window"), {}, classList);
    }

    private _createContentDiv(contentDivClassNames: string[]): HTMLDivElement {
        contentDivClassNames.push("app-window");
        contentDivClassNames.push("content");

        const contentDiv = AppWindowUtil.createDiv(IDGen.getId("content"), {}, contentDivClassNames);

        this._setContent(contentDiv);
        return contentDiv;
    }

    private _closeWindow(): void {
        this._windowDiv.remove();
    }
}

export {AppWindow};