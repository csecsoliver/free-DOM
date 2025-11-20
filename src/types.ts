export interface freeDOMDocument extends HTMLDocument {
  body: HTMLElement & {
    w: string;
    h: string;
  };
  children: HTMLCollectionOf<freeDOMElement>;
  
}
export interface freeDOMElement extends HTMLElement {
  x: string;
  y: string;
  w: string;
  h: string;
  bg: string;
}

// here come the redundant interfaces only used in development, not something you need when making use of free-DOM
export interface freeDOMDivElement extends HTMLDivElement {
  x: string;
  y: string;
  w: string;
  h: string;
  bg: string;
}
export interface freeDOMInputElement extends HTMLInputElement {
  x: string;
  y: string;
  w: string;
  h: string;
  bg: string;
}