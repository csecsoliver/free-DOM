import Konva from "konva";
import * as types from "./types";
import { shapes } from "./elements";
import type { Context } from "konva/lib/Context";
import type { Shape } from "konva/lib/Shape";
export class DOM {
  public stage: Konva.Stage | null = null;
  public layer: Konva.Layer | null = null;
  public doc: types.freeDOMDocument | null = null;
  public fds: types.freeDOMStyle | null = null;
  constructor(url: string) {
    fetch(url)
      .then((response) => response.text())
      .then((htmlString) => {
        const parser = new DOMParser();
        this.doc = parser.parseFromString(
          htmlString,
          "text/html"
        ) as types.freeDOMDocument;
        this.stage = new Konva.Stage({
          container: "stage-container",
          // width: window.innerWidth + 200 * 2,
          // height: window.innerHeight + 200 * 2,
          width: parseInt(this.doc!.body.getAttribute('w')!),
          height: parseInt(this.doc!.body.getAttribute('h')!),
        });
        if (this.doc!.body.getAttribute('fds')) {
          fetch(this.doc!.body.getAttribute('fds')!)
            .then((response) => response.text())
            .then((rawfds) => {
              this.fds = JSON.parse(rawfds || '{}') as types.freeDOMStyle;
            });
        }
        document.getElementById("large-container")!.style.width =
          this.stage.width() + "px";
        document.getElementById("large-container")!.style.height =
          this.stage.height() + "px";
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
        this.render();
        this.repositionStage();
      })
      .catch((error) => {
        alert("Error fetching the URL, more details in console.");
        console.error(error);
      });
    document
      .getElementById("scroll-container")!
      .addEventListener("scroll", this.repositionStage);
  }

  public render() {
    if (!this.doc || !this.layer || !this.stage) {
      console.error("Document or layer or stage not initialized");
      throw new Error("Document or layer or stage not initialized");
    }
    const elements = Array.from(this.doc.body.children);
    console.log(elements);
    elements.forEach((element) => {
      const konvaElement = this.createKonvaElement(
        element as types.freeDOMElement
      );
      console.log(konvaElement);
      this.layer!.add(konvaElement);
    });

    this.layer.draw();
  }
  private createKonvaElement(element: types.freeDOMElement): Konva.Shape {
    // fds specifiable attribues
    const cascadedStyle = {...(this.fds?.[element.nodeName.toLowerCase()] || {})} as types.freeDOMStyleRule;
    for (const i of element.classList) {
      const classStyle = this.fds?.[`.${i}`];
      if (classStyle) {
        Object.assign(cascadedStyle, classStyle);
      }
    }
    const idStyle = this.fds?.[`#${element.id}`];
    if (idStyle) {
      Object.assign(cascadedStyle, idStyle);
    }

    const x = parseInt(element.getAttribute('x') ??( cascadedStyle.x ?? '0'));
    const y = parseInt(element.getAttribute('y') ??( cascadedStyle.y ?? '0'));
    const w = parseInt(element.getAttribute('w') ??( cascadedStyle.w ?? '0'));
    const h = parseInt(element.getAttribute('h') ??( cascadedStyle.h ?? '0'));
    const strokew = parseFloat(element.getAttribute('strokew') ??( cascadedStyle.strokew ?? '0'));
    const fill = element.getAttribute('fill') ??( cascadedStyle.fill ?? '');
    const stroke = element.getAttribute('stroke') ??( cascadedStyle.stroke ?? '');
    const draggable = (element.getAttribute('draggable') ??( cascadedStyle.draggable?? 'false')) === 'true';
    const scale = (element.getAttribute('scale') ??( cascadedStyle.scale ?? '1,1')).split(',')
    const scaleX = parseFloat(scale[0]);
    const scaleY = parseFloat(scale[1]);
    const contain = (element.getAttribute('contain') ??( cascadedStyle.contain ?? 'false')) === 'true';

    // non-fds specifiable attributes
    const html_shape = element.getAttribute('shape') || '';
    const html_coords = element.getAttribute('coords') || '';
    const src = element.getAttribute('src') || '';
    const href = element.getAttribute('href') || '';
    const text = element.textContent || "";
    const shape = new Konva.Shape(
      {
        sceneFunc: (shapes[element.nodeName.toLowerCase()] as any) || function (context: Context, shape: Shape) {
          context.beginPath();
          context.rect(0, 0, w, h);
          context.closePath();
          context.fillStrokeShape(shape);
        },
        fill: fill,
        stroke: stroke,
        strokeWidth: strokew,
        draggable: draggable,
        html_shape: html_shape,
        html_coords: html_coords,
        x: x,
        y: y,
        width: w,
        height: h,
        text: text,
        src: src,
        href: href,
        scaleX: scaleX,
        scaleY: scaleY,
      }
    );
    shape.on('dragmove', () => {
      shape.x(Math.round((shape.x()) / scaleX) * scaleX);
      shape.y(Math.round((shape.y()) / scaleY) * scaleY);0
      if (contain) {
          
        if (shape.x() < 0) shape.x(0);
        if (shape.y() < 0) shape.y(0);
        if (shape.x() + (shape.width() * shape.scaleX()) > this.stage!.width())
          shape.x(this.stage!.width() - (shape.width() * shape.scaleX()));
        if (shape.y() + (shape.height() * shape.scaleY()) > this.stage!.height())
          shape.y(this.stage!.height() - (shape.height() * shape.scaleY()));
      }
    });
    return shape;
  }
  public repositionStage = () => {
    const dx = document.getElementById("scroll-container")!.scrollLeft;
    const dy = document.getElementById("scroll-container")!.scrollTop;
    this.stage!.container().style.transform =
      "translate(" + dx + "px, " + dy + "px)";
    this.stage!.x(-dx);
    this.stage!.y(-dy);
  };
}
