import { DOM } from "./dom";
let dom: DOM;

const url = new URL(location.href)
const searchParams = url.searchParams;
const inputUrl = searchParams.get("url");
if (inputUrl) {
  dom = new DOM(inputUrl);
  (document.getElementById("gotoinput") as HTMLInputElement).value = inputUrl;
}
document.getElementById("gotobutton")?.addEventListener("click", (e) => {
  e.preventDefault();
  const input = (document.getElementById("gotoinput") as HTMLInputElement).value;
  dom = new DOM(input);
  
});
