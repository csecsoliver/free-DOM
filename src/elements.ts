import type { Context } from "konva/lib/Context";
import type { Shape } from "konva/lib/Shape";

export const shapes: {[key: string]: Function} = {
    "h1": title,
    "p": paragraph,
    "img": image,
    "a": link,
}
function title(context: Context, shape: Shape) {
    const text = (shape as any).attrs.text || "No Text";
    const width = (shape as any).attrs.width || 0;
    const height = (shape as any).attrs.height || 0;
    const fill = (shape as any).attrs.fill || "black";
    context.beginPath();
    context.font = `${height}px Courier New`;
    context.fillStyle = fill;
    context.fillText(text, 0, height);
    context.closePath();
    context.fillStrokeShape(shape);
}
function paragraph(context: Context, shape: Shape) {
    const text = (shape as any).attrs.text || "No Text";
    const width = (shape as any).attrs.width || 10;
    const height = (shape as any).attrs.height || 10;
    const fill = (shape as any).attrs.fill || "black";
    const cpl = Math.floor(width / (height * 0.6));
    const lines = [];
    const wordArray = text.split(' ');
    let currentLine = '';

    for (const i of wordArray) {
        if ((currentLine + i).length <= cpl) {
            currentLine += i + ' ';
        } else {
            lines.push(currentLine.trim());
            currentLine = i + ' ';
        }
    }
    lines.push(currentLine.trim());
    context.beginPath();
    context.fillStyle = fill;
    context.font = `${height}px Courier New`;
    for (let i = 0; i < lines.length; i++) {
        context.fillText(lines[i], 0, height+i*height);
    }
    context.closePath();
    context.fillStrokeShape(shape);
}
function image(context: Context, shape: Shape) {
    const src = (shape as any).attrs.src || "";
    
    let img = (shape as any).imageObj;

    if (!img) {
        img = new Image();
        img.onload = () => {
            const layer = shape.getLayer();
            layer?.batchDraw();
        };
        img.src = src;
        (shape as any).imageObj = img;
    }

    if (img.complete && img.naturalWidth > 0) {
        let width = (shape as any).attrs.width;
        let height = (shape as any).attrs.height;

        if (!width && !height) {
            width = img.naturalWidth;
            height = img.naturalHeight;
        } else if (!width) {
            width = (height / img.naturalHeight) * img.naturalWidth;
        } else if (!height) {
            height = (width / img.naturalWidth) * img.naturalHeight;
        }
        context.drawImage(img, 0, 0, width, height);
    }
}
// function link(context: Context, shape: Shape) {
//     const text = (shape as any).attrs.text || "No Text";
//     const width = (shape as any).attrs.width || 0;
//     const height = (shape as any).attrs.height || 0;
//     const href = (shape as any).attrs.href || 0;

//     context.beginPath();
//     context.font = `${height}px Courier New`;
//     shape.on('click', () => {
//         return
//     });
//     context.fillText(text, 0, height);
//     context.closePath();
//     context.fillStrokeShape(shape);
// }