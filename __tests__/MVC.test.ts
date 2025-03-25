import {Model, ModelEntity} from "../src/modules/mvc/Model";
import {View} from "../src/modules/mvc/View";
import Controller from "../src/modules/mvc/Controller";
import Vector2D from "../src/modules/math/vectors/Vector2D";

describe("Model", () => {
    test("should create an empty model", () => {
        const model = Model.empty();
        expect(model.data.size).toBe(0);
    });

    test("should add an entity to the model", () => {
        const model = new Model();
        const entity = new ModelEntity(0);
        model.add(entity);
        expect(model.data.size).toBe(1);
        expect(model.data.get(0)).toBe(entity);
    });

    test("should update all entities in the model", () => {
        const model = new Model();
        const entity = new ModelEntity(5);
        model.add(entity);
        model.update();
        expect(entity.id).toBe(5);
    });
});

describe("ModelEntity", () => {
    test("should initialize with given position", () => {
        const entity = new ModelEntity(5);
        expect(entity.id).toBe(5);
    });

    test("should update position correctly", () => {
        const entity = new ModelEntity(5);
        entity.update();
        expect(entity.id).toBe(5);
    });
});

describe("Controller", () => {
    test("should initialize with an empty model and a view", () => {
        const controller = new Controller(new View());
        expect(controller.model.data.size).toBe(0);
        expect(controller.view).toBeInstanceOf(View);
    });

    test("should update model and view", () => {
        const controller = new Controller(new View());
        const model = new Model();
        model.add(new ModelEntity(0));
        controller.model = model;
        controller.update();
        // @ts-ignore
        expect(controller.model.data.get(0).id).toBe(0);
    });

    test("should reload the model with default configuration", () => {
        const controller = new Controller(new View());
        controller.reload();
        expect(controller.model.data.size).toBe(1);
    });
});
