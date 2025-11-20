import Konva from "konva";
interface MyDOM extends HTMLDocument {
  body: {
    w: number;
    h: number;
  };
}
export class DOM {
  public stage: Konva.Stage | null = null;
  public layer: Konva.Layer | null = null;
  public doc: MyDOM | null = null;
  constructor(url: string) {
    fetch(url)
      .then((response) => response.text())
      .then((htmlString) => {
        const parser = new DOMParser();
        this.doc = (parser.parseFromString(htmlString, "text/html") as unknown as MyDOM);
        this.stage = new Konva.Stage({
          container: "app",
          width: this.doc.body.w,
          height: this.doc.body.h,
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
      })
      .catch((error) => {
        alert("Error fetching the URL, more details in console.");
        console.error(error);
      });
  }

  public render() {
    if (!this.doc) return;
    const elements = Array.from(this.doc.children);

    elements.forEach((element) => {
      const konvaElement = this.createKonvaElement(element);
      this.layer.add(konvaElement);
    });

    this.layer.draw();
  }
  private createKonvaElement(element: HTMLElement): Konva.Shape {
    // Create a Konva shape based on the HTML element
    // This is a simplified example; you can expand it based on your needs

    return rect;
  }
}
