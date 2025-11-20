import type { Context } from "konva/lib/Context";
import type { Shape } from "konva/lib/Shape";

export const shapes: {[key: string]: Function} = {
    "h1": title,
}
function title(context: Context, shape: Shape) {
    const text = (shape as any).attrs.text || "No Text";
    const width = (shape as any).attrs.width || 10;
    const height = (shape as any).attrs.height || 10;
    context.beginPath();
    context.font = `${height}px Arial`;
    context.fillText(text, width, height);
    context.closePath();
    context.fillStrokeShape(shape);
}