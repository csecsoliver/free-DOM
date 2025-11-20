import Konva from "konva";
import * as types from "./types";
import { shapes } from "./elements";
import type { Context } from "konva/lib/Context";
import type { Shape } from "konva/lib/Shape";
export class DOM {
  public stage: Konva.Stage | null = null;
  public layer: Konva.Layer | null = null;
  public doc: types.freeDOMDocument | null = null;
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
          width: window.innerWidth + 200 * 2,
          height: window.innerHeight + 200 * 2,
        });
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
    const x = parseInt(element.getAttribute('x') || '0');
    const y = parseInt(element.getAttribute('y') || '0');
    const w = parseInt(element.getAttribute('w') || '0');
    const h = parseInt(element.getAttribute('h') || '0');
    const bg = element.getAttribute('bg') || '';
    const text = element.textContent || "";

    const shape = new Konva.Shape(
      {
        sceneFunc: (shapes[element.nodeName.toLowerCase()] as any )|| function (context: Context, shape: Shape) {
          context.beginPath();
          context.rect(0, 0, w, h);
          context.closePath();
          context.fillStrokeShape(shape);
        },
        fill: bg,
        x: x,
        y: y,
        width: w,
        height: h,
        text: text,
      }
    );
    
    return shape;
  }
  public repositionStage = () => {
    const dx = document.getElementById("scroll-container")!.scrollLeft - 200;
    const dy = document.getElementById("scroll-container")!.scrollTop - 200;
    this.stage!.container().style.transform =
      "translate(" + dx + "px, " + dy + "px)";
    this.stage!.x(-dx);
    this.stage!.y(-dy);
  };
}
