import {Model, ModelEntity} from "../src/modules/mvc/Model";
import {View} from "../src/modules/mvc/View";
import Controller from "../src/modules/mvc/Controller";
import Vector2D from "../src/modules/math/vectors/Vector2D";

class TestEntity extends ModelEntity {
    public id = 'TestEntity';
    public uuid = 'TestEntity-UUID';
}


describe("Controller", () => {
    test("should initialize with an empty model and a view", () => {
        const controller = new Controller(new View(), new Model());
        expect(controller.model.data.size).toBe(0);
        expect(controller.view).toBeInstanceOf(View);
    });

    test("should update model and view", () => {
        const controller = new Controller(new View(), new Model());
        const model = new Model();
        model.add(new TestEntity());
        controller.model = model;
        controller.update(1);
    });

    test("should reload the model with default configuration", () => {
        const controller = new Controller(new View(), new Model());
        controller.reload();
        expect(controller.model.data.size).toBe(0);
    });
});
