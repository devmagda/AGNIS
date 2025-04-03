class AppWindowUtil {
    static createDiv(id?: string, styles: Partial<CSSStyleDeclaration> = {}, classList: string[] = []): HTMLDivElement {
        const div = document.createElement("div");
        classList.push("tui");
        if (id) div.id = id;
        Object.assign(div.style, styles);
        div.classList.add(...classList);
        return div;
    }

    static createButton(text: string, onClick: () => void, styles: Partial<CSSStyleDeclaration> = {}, classList: string[] = []): HTMLButtonElement {
        const button = document.createElement("button");
        classList.push("tui");
        button.textContent = text;
        button.onclick = onClick;
        Object.assign(button.style, styles);
        button.classList.add(...classList);
        return button;
    }

    static createTitle(text: string, tag: "p" | "h1" | "h2" | "h3", styles: Partial<CSSStyleDeclaration> = {}, classList: string[] = []): HTMLElement {
        const title = document.createElement(tag);
        classList.push("tui");
        title.textContent = text;
        Object.assign(title.style, styles);
        title.classList.add(...classList);
        return title;
    }

    static createCanvas(id: string, width: number, height: number, styles: Partial<CSSStyleDeclaration> = {}, classList: string[] = []): HTMLCanvasElement {
        const canvas = document.createElement("canvas");
        classList.push("tui");
        canvas.id = id;
        canvas.width = width;
        canvas.height = height;
        Object.assign(canvas.style, styles);
        canvas.classList.add(...classList);
        return canvas;
    }

    static createGameCanvas(id: string, width: number, height: number, styles: Partial<CSSStyleDeclaration> = {}, classList: string[] = []): HTMLCanvasElement {
        const canvas = AppWindowUtil.createCanvas(id, width, height, styles, classList);
        window.addEventListener('resize', () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            canvas.width = newWidth;
            canvas.height = newHeight;
        });
        return canvas;
    }

    static createButtonContainer(id: string, buttons: HTMLButtonElement[], styles: Partial<CSSStyleDeclaration> = {}) {
        const buttonContainerDiv = AppWindowUtil.createDiv(id);
        buttons.forEach((button: HTMLButtonElement) => {
            buttonContainerDiv.appendChild(button);
        });
        return buttonContainerDiv;
    }
}

export { AppWindowUtil };
