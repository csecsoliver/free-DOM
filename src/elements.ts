import type { Context } from "konva/lib/Context";
import type { Shape } from "konva/lib/Shape";

export const shapes: { [key: string]: Function } = {
  "h1": title,
  "p": paragraph,
  "img": image,
  "a": link,
  "area": area,
  "div": div,
  "hr": hr
};
function title(context: Context, shape: Shape) {
  const text = (shape as any).attrs.text || "No Text";
  const draggable = (shape as any).attrs.draggable || false;
  const height = (shape as any).attrs.height || 0;
  const fill = (shape as any).attrs.fill || "black";
  context.beginPath();
  context.font = `${height}px Courier New`;
  context.fillStyle = fill;
  context.fillText(text, 0, height);
  context.closePath();
  context.fillStrokeShape(shape);
  if (draggable){shape.hitFunc((hitContext: Context, shape: Shape) => {
    hitContext.beginPath();
    const w = text.length * height * 0.6;
    hitContext.rect(0, 0, w, height);
    hitContext.closePath();
    hitContext.fillStrokeShape(shape);
  });}
}
function paragraph(context: Context, shape: Shape) {
  const text = (shape as any).attrs.text || "No Text";
  const width = (shape as any).attrs.width || 0;
  const height = (shape as any).attrs.height || 0;
  const fill = (shape as any).attrs.fill || "black";
  const cpl = Math.floor(width / (height * 0.6));
  const draggable = (shape as any).attrs.draggable || false;
  const lines = [];
  const wordArray = text.split(" ");
  let currentLine = "";

  for (const i of wordArray) {
    if ((currentLine + i).length <= cpl) {
      currentLine += i + " ";
    } else {
      lines.push(currentLine.trim());
      currentLine = i + " ";
    }
  }
  lines.push(currentLine.trim());
  context.beginPath();
  context.fillStyle = fill;
  context.font = `${height}px Courier New`;
  let countedheight = 0;
  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], 0, height + i * height);
    countedheight += height;
  }
  context.closePath();
  if (draggable){context.fillStrokeShape(shape);shape.hitFunc((hitContext: Context, shape: Shape) => {
    hitContext.beginPath();
    const w = width;
    hitContext.rect(0, 0, w, countedheight);
    hitContext.closePath();
    hitContext.fillStrokeShape(shape);
  });}
}
function image(context: Context, shape: Shape) {
  const src = (shape as any).attrs.src || "";

  const draggable = (shape as any).attrs.draggable || false;
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

  let width = (shape as any).attrs.width;
  let height = (shape as any).attrs.height;
  if (img.complete && img.naturalWidth > 0) {

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
  if (draggable){shape.hitFunc((hitContext: Context, shape: Shape) => {
    hitContext.beginPath();
    hitContext.rect(0, 0, width, height);
    hitContext.closePath();
    hitContext.fillStrokeShape(shape);
  });}
}
function link(context: Context, shape: Shape) {
  const text = (shape as any).attrs.text || "No Text";
  const width = (shape as any).attrs.width || 0;
  const height = (shape as any).attrs.height || 0;
  const href = (shape as any).attrs.href || 0;
  context.beginPath();
  context.font = `${height}px Courier New`;

  context.fillText(text, 0, height);
  context.closePath();
  context.fillStrokeShape(shape);
  shape.on("click tap", () => {
    location.href = window.location.href.split('?')[0]+"?url="+href;
  });
  shape.on("mouseover", () => {
    document.body.style.cursor = "pointer";
  });
  shape.on("mouseout", () => {
    document.body.style.cursor = "default";
  });
  shape.hitFunc((hitContext: Context, shape: Shape) => {
    hitContext.beginPath();
    const w = width || text.length * height * 0.6;
    hitContext.rect(0, 0, w, height);
    hitContext.closePath();
    hitContext.fillStrokeShape(shape);
  });
}
function area(context: Context, shape: Shape) {
  // const text = (shape as any).attrs.text || "No Text";
  const href = (shape as any).attrs.href || "";
  const html_shape = (shape as any).attrs.html_shape || "rect";
  const html_coords = (shape as any).attrs.html_coords || "0,0,0,0";
  const draggable = (shape as any).attrs.draggable || false;
  const coords = html_coords.split(',').map((c: string) => parseInt(c.trim()));
  context.beginPath();
  switch (html_shape) {
    case "rect":
      context.rect(coords[0], coords[1], coords[2] - coords[0], coords[3] - coords[1]);
      break;
    case "circle":
      const centerX = coords[0];
      const centerY = coords[1];
      const radius = coords[2];
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      break;
    case "poly":
      if (coords.length >= 4) {
        context.moveTo(coords[0], coords[1]);
        for (let i = 2; i < coords.length; i += 2) {
          context.lineTo(coords[i], coords[i + 1]);
        }
        context.closePath();
      }
      break;
    default:
      break;
  }
  context.closePath();
  context.fillStrokeShape(shape);
  if (!href) {
    if(!draggable){
      shape.hitFunc((hitContext: Context, shape: Shape) => {
        hitContext.beginPath();
        hitContext.closePath();
        hitContext.fillStrokeShape(shape);
      });
    }
    
    return;
  };
  shape.on("click tap", () => {
    location.href = window.location.href.split('?')[0]+"?url="+href;
  });
  shape.on("mouseover", () => {
    document.body.style.cursor = "pointer";
  });
  shape.on("mouseout", () => {
    document.body.style.cursor = "default";
  });
  
}
function div(context: Context, shape: Shape) {
  const width = (shape as any).attrs.width || 0;
  const height = (shape as any).attrs.height || 0;
  const fill = (shape as any).attrs.fill || "transparent";
  const draggable = (shape as any).attrs.draggable || false;
  context.beginPath();
  context.fillStyle = fill;
  context.rect(0, 0, width, height);
  context.closePath();
  context.fillStrokeShape(shape);
  if (!draggable){
    shape.hitFunc((hitContext: Context, shape: Shape) => {
      hitContext.beginPath();
      hitContext.closePath();
      hitContext.fillStrokeShape(shape);
    });
  }
}
function hr(context: Context, shape: Shape) {
  const width = (shape as any).attrs.width || 100;
  const height = (shape as any).attrs.height || 5;
  const fill = (shape as any).attrs.fill || "black";
  const draggable = (shape as any).attrs.draggable || false;
  context.beginPath();
  context.fillStyle = fill;
  context.rect(0, 0, width, height);
  context.closePath();
  context.fillStrokeShape(shape);    
  if (!draggable){
    shape.hitFunc((hitContext: Context, shape: Shape) => {
      hitContext.beginPath();
      hitContext.closePath();
      hitContext.fillStrokeShape(shape);
    });
  }
}
