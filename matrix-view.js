import {html, css, svg, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class MatrixView extends LitElement {
  static styles = css``;

  static properties = {
    data: {type: String},
    size: {type: Number},
    width: {type: Number},
    height: {type: Number},
  };

  constructor() {
    super();
    this.data = [[.9, .5, .6], [.5, 0.1, .6]];
    this.size = 50;
    this.width = this.size;
    this.height = this.size;
    this.padding = this.height * .01;
    this.color = d3.scaleLinear()
        .domain([0, 1])
        .range(["black","white"]);
  }

  // height="${this.height - 2 * this.padding}"
  render() {
    let size = ((this.width - this.padding) / this.data.length);
    return html`<svg width=${this.width} height=${this.height}>
        ${this.data.map((row,i) => svg`<g transform="translate(0, ${(i * size) + this.padding})">
            ${row.map((c,j) =>
            svg`<rect x=${(j * size) + this.padding}
                y="${this.padding}"
                width="${size - this.padding}"
                height="${size - this.padding}"
                style="fill:${this.color(c)}">
            </rect>`)
            }
        </g>`)}
    </svg>`;
  }
}
customElements.define('matrix-view', MatrixView);
