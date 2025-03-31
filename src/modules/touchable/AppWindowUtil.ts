class AppWindowUtil {
    static createDiv(id?: string, styles: Partial<CSSStyleDeclaration> = {}): HTMLDivElement {
        const div = document.createElement("div");
        if (id) div.id = id;
        Object.assign(div.style, styles);
        return div;
    }

    static createButton(text: string, onClick: () => void, styles: Partial<CSSStyleDeclaration> = {}): HTMLButtonElement {
        const button = document.createElement("button");
        button.textContent = text;
        button.onclick = onClick;
        Object.assign(button.style, styles);
        return button;
    }

    static createTitle(text: string, tag: "p" | "h1" | "h2" | "h3", styles: Partial<CSSStyleDeclaration> = {}): HTMLElement {
        const title = document.createElement(tag);
        title.textContent = text;
        Object.assign(title.style, styles);
        return title;
    }

    static createCanvas(id: string, width: number, height: number, styles: Partial<CSSStyleDeclaration> = {}): HTMLCanvasElement {
        const canvas = document.createElement("canvas");
        canvas.id = id;
        canvas.width = width;
        canvas.height = height;
        Object.assign(canvas.style, styles);
        return canvas;
    }

    static createGameCanvas(id: string, width: number, height: number, styles: Partial<CSSStyleDeclaration> = {}): HTMLCanvasElement {
        const canvas = AppWindowUtil.createCanvas(id, width, height, styles);
        window.addEventListener('resize', () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            canvas.width = newWidth;
            canvas.height = newHeight;
        });
        return canvas;
    }

    static clearStyles(element: HTMLElement) {
        if(element.style) {
            element.style
        }
    }
}

export {AppWindowUtil}