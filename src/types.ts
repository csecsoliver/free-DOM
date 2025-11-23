export interface freeDOMDocument extends HTMLDocument {
  body: HTMLElement & {
    w: string;
    h: string;
    style: string;
  };
  children: HTMLCollectionOf<freeDOMElement>;
  
}
export interface freeDOMElement extends HTMLElement {
  x: string;
  y: string;
  w: string;
  h: string;
  fill: string;
}

// here come the redundant interfaces only used in development, not something you need when making use of free-DOM
export interface freeDOMDivElement extends HTMLDivElement {
  x: string;
  y: string;
  w: string;
  h: string;
  fill: string;
}
export interface freeDOMInputElement extends HTMLInputElement {
  x: string;
  y: string;
  w: string;
  h: string;
  fill: string;
}
export interface freeDOMStyle {
  "*": freeDOMStyleRule | undefined;
  "div": freeDOMStyleRule | undefined;
  "p": freeDOMStyleRule | undefined;
  "h1": freeDOMStyleRule | undefined;
  "img": freeDOMStyleRule | undefined;
  "a": freeDOMStyleRule | undefined;
  "area": freeDOMStyleRule | undefined;
  "hr": freeDOMStyleRule | undefined;
  [key: string]: freeDOMStyleRule | undefined;
}
export interface freeDOMStyleRule {
  x: string;
  y: string;
  w: string;
  h: string;
  fill: string;
  stroke: string;
  strokew: string;
  scale: string;
  draggable: string;
  contain: string;
}