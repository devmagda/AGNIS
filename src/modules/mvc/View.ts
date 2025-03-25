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
        model.data.forEach((entity: ModelEntity) => {
            console.log(`Entity at position: (${entity.position.x}, ${entity.position.y})`);
        });
    }
}

class ViewCanvas extends View {
    _canvas: HTMLCanvasElement;
    _context: CanvasRenderingContext2D;

    canvasSize = 1000;

    constructor(canvas: HTMLCanvasElement) {
        super();
        this._canvas = canvas;
        this._canvas.width = this.canvasSize;
        this._canvas.height = this.canvasSize;
        const context = canvas.getContext("2d");
        if (context) {
            this._context = context;
        } else {
            console.error('Canvas: ', canvas);
            throw new Error("Context not found in canvas.");
        }
    }

    update(model: Model): void {
        this._lastModel = model;

        // Clear the canvas before drawing
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        model.data.forEach((entity: ModelEntity) => {
            if(entity satisfies Drawable) {
                entity.draw(this._context);
            }
            console.log(`Entity at position: (${entity.position.x}, ${entity.position.y})`);
        });
    }
}

export {View, ViewCanvas, Drawable};