import {html, css, svg, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class ContinuousLegend extends LitElement {
  static styles = css``;

  static properties = {
    data: {type: Array},
	colors: {type: Array}
  };

  constructor() {
    super();
    this.data = [0, 1];
	this.colors = ["blue", "red"];
  }

  render() {
	this.scale = d3.scaleLinear()
		.range(this.colors)
		.domain(this.data);
	let stopScale = d3.scaleLinear()
		.range([0, 100])
		.domain([0, this.data.length - 1]);
	let domain = this.scale.domain();
    return html`<svg width="140" height="50">
		<defs>
			<linearGradient id="gradient">
			${this.data.map((d,i) => svg`<stop offset="${stopScale(i)}%" stop-color="${this.scale(d)}" />`)}
			</linearGradient>
		</defs>
		<rect width="100" height="15" x=20 y=20 fill="url(#gradient)"></rect>
		<text x="20" y="12" fill="black"> ${domain[0]}</text>
		<text x="100" y="12" fill="black">${domain[domain.length - 1]}</text>
	</svg>`;
  }
}
customElements.define('continuous-legend', ContinuousLegend);
