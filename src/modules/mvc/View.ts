import {Model, ModelEntity} from "./Model";

export default class View {
    _canvas: HTMLCanvasElement;
    _context: CanvasRenderingContext2D;
    _lastModel: Model;

    canvasSize = 1000;

    constructor(canvas: HTMLCanvasElement) {
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
        this._lastModel = Model.empty();
    }

    update(model: Model): void {
        this._lastModel = model;

        // Clear the canvas before drawing
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        model.data.forEach((entity: ModelEntity) => {
            this._context.fillStyle = "white"; // Set fill color
            this._context.fillRect(entity.position.x, entity.position.y, 10, 10); // Draw 10x10 rectangle

            console.log(`Entity at position: (${entity.position.x}, ${entity.position.y})`);
        });
    }

}