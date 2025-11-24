# free-DOM
This is a canvas based website viewer. Its syntax is similar to html, but is more accurately xml. It does use html element defaults, but just for ease of editing and parsing. 

## Usage
The files can be served directly by any server, and those urls can be put into any instance of the viewer. Links can be clicked, and some things can be dragged. The pages have unique widths and heights, and can be traversed by scrolling, shift-scrolling and dragging on mobile.

## Syntax and usage reference
### `<body>`
This element is the root element of the page. It HAS to have a `w` and a `h` attribute for width and height of the canvas respectively. It can also have an `fds` attribute, but no idea what works in it right now, so don't use it yet.
### All elements below
`x`: the x position of the element, counted by default canvas rules  
`y`: the y position of the element
`draggable`: defines wheter the element can be moved by drag and drop
`contain`: defines whether the element should be stopped from exiting the canvas
`scale`: defines the internal scale of the element (not `x`, `y`). is formatted as "x,y" for x and y scale. Beware that elements are snapped to integer positions, and those are scaled up too. (see kanoodle.fd demo)
### `<h1>`
This is the only header text element for now, it can to be customized with `h` for font size and `fill` for font color. If no height is provided, it defaults to 10.
### `<p>`
Basic paragraph element. It has `h` for font size, `w` for row length and fill for color. It does not break words of any length.
### `<a>`
Link element, not really worthy of the "anchor" name. `href` should be a link to an fd file. `h` is the font size, `fill` is the font color.
### `<area>`
Polygon element, works a lot like the html counterpart, but it's not primarily for providing click areas, but for graphics. `shape`, `coords`, `href` are the same as descibed on this page: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/area  
Can be customized with `fill` for fill color, `stroke` for outline color, `strokew` for stroke width.