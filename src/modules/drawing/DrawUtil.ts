class DrawUtil {
    static circle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    static circleFilled(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    static square(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
        ctx.strokeRect(x, y, size, size);
    }

    static squareFilled(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
        ctx.fillRect(x, y, size, size);
    }

    static line(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}
