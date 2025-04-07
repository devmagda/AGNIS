import {EventBus} from "../eventbus/EventBus";
import Vector2D from "../math/vectors/Vector2D";
import VectorUtil from "../math/vectors/VectorUtil";
import {EventNames} from "../eventbus/EventNames";

class InputManager {
    private _inputBus = EventBus.getInstance();

    private constructor() {
        this.initializeListeners();
        this.setupModifiers();
    }

    private static _instance: InputManager | null = null;

    static get instance(): InputManager {
        if (!this._instance) {
            this._instance = new InputManager();
        }
        return this._instance;
    }

    private _ctrlModifier: boolean = false;
    private _shiftModifier: boolean = false;
    private _mousePosition: Vector2D = VectorUtil.zero(); // This will track both mouse and touch position

    get mousePosition(): Vector2D {
        return this._mousePosition;
    }

    // Adding touch event listeners
    addTouchstart(
        keyFn: (event: TouchEvent) => void,
    ): void {
        this._inputBus.on<TouchEvent>(EventNames.TouchStart, keyFn);
    }

    addTouchmove(
        keyFn: (event: TouchEvent) => void,
    ): void {
        this._inputBus.on<TouchEvent>(EventNames.TouchMove, keyFn);
    }

    addTouchend(
        keyFn: (event: TouchEvent) => void,
    ): void {
        this._inputBus.on<TouchEvent>(EventNames.TouchEnd, keyFn);
    }

    // Existing mouse event listeners
    addKeydown(
        keyCode: string,
        keyFn: (event: KeyboardEvent) => void,
    ): void {
        this._inputBus.on<KeyboardEvent>(EventNames.KeyDown + "-" + keyCode, keyFn);
    }

    addKeyup(
        keyCode: string,
        keyFn: (event: KeyboardEvent) => void,
    ): void {
        this._inputBus.on<KeyboardEvent>(EventNames.KeyUp + "-" + keyCode, keyFn);
    }

    addMousedown(
        keyFn: (event: MouseEvent) => void,
    ): void {
        this._inputBus.on<MouseEvent>(EventNames.MouseDown, keyFn);
    }

    addMousemove(
        keyFn: (event: MouseEvent) => void,
    ): void {
        this._inputBus.on<MouseEvent>(EventNames.MouseMoveCtrl, keyFn);
    }

    addMouseup(
        keyFn: (event: MouseEvent) => void,
    ): void {
        this._inputBus.on<MouseEvent>(EventNames.MouseUp, keyFn);
    }

    private initializeListeners() {
        this.initializeKeyListeners();
        this.initializeMouseListeners();
        this.initializeTouchListeners(); // Initialize touch listeners
    }

    private initializeKeyListeners() {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            this._inputBus.emit<KeyboardEvent>(EventNames.KeyDown + "-" + event.code, event);
        });

        document.addEventListener("keyup", (event: KeyboardEvent) => {
            this._inputBus.emit<KeyboardEvent>(EventNames.KeyUp + "-" + event.code, event);
        });
    }

    private initializeMouseListeners() {
        const canvas = document.querySelector("canvas#game_canvas") as HTMLCanvasElement;
        if (canvas) {
            window.addEventListener("mousemove", (event: MouseEvent) => {
                if (this._ctrlModifier) {
                    this._inputBus.emit<MouseEvent>(EventNames.MouseMoveCtrl, event);
                }
            });

            this._inputBus.on<MouseEvent>(EventNames.MouseMoveCtrl, (event: MouseEvent) => {
                this._mousePosition.x = event.clientX;
                this._mousePosition.y = event.clientY;
            });

            canvas.addEventListener("click", (event: MouseEvent) => {
                event.preventDefault();
                this._inputBus.emit<MouseEvent>(EventNames.MouseClick, event);
            });
            document.addEventListener("contextmenu", (event: MouseEvent) => {
                event.preventDefault();
                this._inputBus.emit<MouseEvent>(EventNames.MouseContextMenu, event);
            });
        } else {
            console.error("Could not find canvas while trying to setup the InputManager!", this);
            throw new Error("Could not find canvas while trying to setup the InputManager!");
        }
    }

    private initializeTouchListeners() {
        const canvas = document.querySelector("canvas#game_canvas") as HTMLCanvasElement;
        if (canvas) {
            canvas.addEventListener("touchstart", (event: TouchEvent) => {
                event.preventDefault();
                this._inputBus.emit<TouchEvent>(EventNames.TouchStart, event);
            });

            canvas.addEventListener("touchmove", (event: TouchEvent) => {
                event.preventDefault();
                // Update mousePosition with the first touch's position (index 0)
                this._mousePosition.x = event.touches[0].clientX;
                this._mousePosition.y = event.touches[0].clientY;
                this._inputBus.emit<TouchEvent>(EventNames.TouchMove, event);
            });

            canvas.addEventListener("touchend", (event: TouchEvent) => {
                event.preventDefault();
                this._inputBus.emit<TouchEvent>(EventNames.TouchEnd, event);
            });
        }
    }

    private setupModifiers() {
        this.addKeydown("ControlLeft", (event: KeyboardEvent) => {
            if (!this._ctrlModifier) {
                this._ctrlModifier = true;
            }
        });

        this.addKeyup("ControlLeft", (event: KeyboardEvent) => {
            if (this._ctrlModifier) {
                this._ctrlModifier = false;
            }
        });

        this.addKeydown("ShiftLeft", (event: KeyboardEvent) => {
            if (!this._shiftModifier) {
                this._shiftModifier = true;
            }
        });

        this.addKeyup("ShiftLeft", (event: KeyboardEvent) => {
            if (this._shiftModifier) {
                this._shiftModifier = false;
            }
        });
    }
}

export {InputManager};
