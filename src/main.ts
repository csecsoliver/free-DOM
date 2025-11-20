import Konva from "konva";
import { DOM } from "./dom";
let dom: DOM;
document.getElementById("gotobutton")?.addEventListener("click", (e) => {
  e.preventDefault();
  const input = (document.getElementById("gotoinput") as HTMLInputElement).value;
  dom = new DOM(input);
  
});
