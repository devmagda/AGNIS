import Vector2D from "../math/vectors/Vector2D";
import { Colors } from "../../constants";
import {HungerStat, Size, ViewRadius} from "../../entities/stats/StatLib";
import VectorUtil from "../math/vectors/VectorUtil";
import Entity from "../../entities/Entity";
import {DrawUtil} from "./DrawUtil";
import {StatDrawUtil} from "./StatDrawUtil";

class EntityRenderer {
    static drawEntity(ctx: CanvasRenderingContext2D, entity: Entity, positionOverride: Vector2D | undefined = undefined) {
        const movement = entity.movementComponent;
        const position = positionOverride ? positionOverride : movement.location;
        const velocity = movement.velocity;
        const rotation = VectorUtil.normalize(movement.orientation);

        const stats = entity.statComponent.statsManager;

        const sizeStat = stats.getStatById(Size.id);
        const radius = sizeStat?.value ?? 10;
        const minimalRadius = 10;

        const healthFactor = entity.aliveStat?.factor ?? -1;
        const actualRadius = minimalRadius + (radius - minimalRadius) * healthFactor;

        const lineEnd = new Vector2D(
            position.x + rotation.x * actualRadius,
            position.y + rotation.y * actualRadius
        );

        // Draw filled entity circle
        DrawUtil.circleFilled(ctx, position.x, position.y, actualRadius, Colors.bgHighlight);

        // Draw facing direction
        DrawUtil.line(ctx, position.x, position.y, lineEnd.x, lineEnd.y, Colors.danger);

        // Draw outline
        DrawUtil.circle(ctx, position.x, position.y, actualRadius, Colors.danger);

        // Draw health and hunger bars
        const hungerStat = stats.getStatById(HungerStat.id);
        const hungerFactor = hungerStat?.factor ?? -1;

        const barWidth = 2 * radius;
        const barHeight = 5;
        const barX = position.x - radius;
        const barY = position.y + radius;

        StatDrawUtil.drawBarsStacked(ctx, barX, barY, barWidth, [
            {
                factor: healthFactor,
                bgColor: '#8B0000',  // Dark red
                fillColor: '#00FF00' // Green
            },
            {
                factor: hungerFactor,
                bgColor: '#bf9600',  // Dark yellow
                fillColor: '#FFFF00' // Bright yellow
            }
        ], barHeight, 2);

        const viewRadiusStat = stats.getStatById(ViewRadius.id);
        if(viewRadiusStat) {
            DrawUtil.circle(ctx, position.x, position.y, viewRadiusStat.value, Colors.danger);
        }
    }

    static drawFood(ctx: CanvasRenderingContext2D, position: Vector2D, radius: number) {
        // Glow effect
        const glow = ctx.createRadialGradient(position.x, position.y, 0, position.x, position.y, radius * 2);
        glow.addColorStop(0, "rgba(255, 255, 0, 0.6)");
        glow.addColorStop(1, "rgba(255, 255, 0, 0)");

        DrawUtil.circleGradient(ctx, position.x, position.y, radius * 2, glow);

        // Central square
        const size = radius * 2;
        DrawUtil.squareFilled(ctx, position.x - radius, position.y - radius, size, "#ffff00");
    }
}

export { EntityRenderer };
