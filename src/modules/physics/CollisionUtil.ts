import Vector2D from "../math/vectors/Vector2D";
import VectorUtil from "../math/vectors/VectorUtil";

// Define a Circle as a type
type Circle = {
    position: Vector2D;
    radius: number;
};

// Define a Box as a type
type Box = {
    position: Vector2D; // top-left corner
    size: Vector2D; // width and height
};

class CollisionUtil {
    // Check if two circles overlap
    static checkCircleOverlap(circle1: Circle, circle2: Circle): boolean {
        const distance = VectorUtil.distance(circle1.position, circle2.position);
        return distance <= (circle1.radius + circle2.radius);
    }

    // Check if a circle overlaps with a box
    static checkCircleBoxCollision(circle: Circle, box: Box): boolean {
        const closestX = Math.max(box.position.x, Math.min(circle.position.x, box.position.x + box.size.x));
        const closestY = Math.max(box.position.y, Math.min(circle.position.y, box.position.y + box.size.y));
        const distanceX = circle.position.x - closestX;
        const distanceY = circle.position.y - closestY;
        return (distanceX * distanceX + distanceY * distanceY) <= (circle.radius * circle.radius);
    }

    // Check if two boxes overlap
    static checkBoxOverlap(box1: Box, box2: Box): boolean {
        return (box1.position.x < box2.position.x + box2.size.x &&
            box1.position.x + box1.size.x > box2.position.x &&
            box1.position.y < box2.position.y + box2.size.y &&
            box1.position.y + box1.size.y > box2.position.y);
    }

    // Check if a point is inside a circle
    static checkPointInsideCircle(point: Vector2D, circle: Circle): boolean {
        const distance = VectorUtil.distance(point, circle.position);
        return distance <= circle.radius;
    }

    // Check if a point is inside a box
    static checkPointInsideBox(point: Vector2D, box: Box): boolean {
        return (point.x >= box.position.x && point.x <= box.position.x + box.size.x &&
            point.y >= box.position.y && point.y <= box.position.y + box.size.y);
    }
}


export {Box, Circle, CollisionUtil}
