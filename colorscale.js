import {html, css, svg, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class CategoricalColors extends LitElement {
  static styles = css`
    p { color: blue };
  `;

  static properties = {
    width: {type: Number},
    colors: {type: Array}
  };

  constructor() {
    super();
    this.colors = ["red", "blue", "yellow", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue"];
    this.width = 500;
    this.height = this.width / this.colors.length;
    this.padding = this.height / 10;
  }

  render() {
    let colorSize = ((this.width - this.padding) / this.colors.length);
    return html`<svg width="${this.width}" height="${this.height}">
      ${this.colors.map((c,i) =>
       svg`<rect x=${(i * colorSize) + this.padding} y="${this.padding}" width="${colorSize - this.padding}" height="${this.height - 2*this.padding}" style="fill:${c}"></rect>`)
    }</svg>`;
  }
}
customElements.define('categorical-colors', CategoricalColors);
