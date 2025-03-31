import {Model, ModelEntity} from "./Model";

interface Drawable {
    draw(ctx: CanvasRenderingContext2D): void;
}

class View {
    _lastModel: Model;
    constructor() {
        this._lastModel = Model.empty();
    }

    update(model: Model) {
        this._lastModel = model;
    }

    redrawOnResize(): void {
        window.addEventListener('resize', () => {
            this.update(this._lastModel);
        });
    }
}

class ViewCanvas extends View {
    _canvas: HTMLCanvasElement;
    _context: CanvasRenderingContext2D;

    static canvasSize = 1000;

    constructor(canvas: HTMLCanvasElement) {
        super();
        this._canvas = canvas;
        const context = canvas.getContext("2d");
        if (context) {
            this._context = context;
        } else {
            console.error('Canvas: ', canvas);
            throw new Error("Context not found in canvas.");
        }
        this.redrawOnResize();
    }

    update(model: Model): void {
        super.update(model);

        // Clear the canvas before drawing
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        model.data.forEach((entity: ModelEntity) => {
            if(entity satisfies Drawable) {
                entity.draw(this._context);
            }
        });
    }
}

export {View, ViewCanvas, Drawable};