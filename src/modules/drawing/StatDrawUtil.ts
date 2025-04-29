import {DrawUtil} from "./DrawUtil";

class StatDrawUtil {
    static drawBar(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number = 5,
        factor: number = 1,
        bgColor: string = '#333',
        fillColor: string = '#0f0'
    ) {
        const clamped = Math.max(0, Math.min(1, factor));

        // Background bar
        DrawUtil.rectFilled(ctx, x, y, width, height, bgColor);

        // Filled portion
        DrawUtil.rectFilled(ctx, x, y, width * clamped, height, fillColor);
    }

    static drawBarsStacked(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        bars: {
            factor: number;
            bgColor?: string;
            fillColor?: string;
        }[],
        height: number = 5,
        spacing: number = 2
    ) {
        bars.forEach((bar, index) => {
            const barY = y + index * (height + spacing);
            this.drawBar(
                ctx,
                x,
                barY,
                width,
                height,
                bar.factor,
                bar.bgColor ?? '#333',
                bar.fillColor ?? '#0f0'
            );
        });
    }
}

export { StatDrawUtil };
