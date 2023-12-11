import { html, css, svg, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class ChartView extends LitElement {
  static styles = css``;

  static properties = {

    title: { type: String },
    marginTop: { type: Number },

    marginRight: { type: Number },
    marginLeft: { type: Number },
    width: { type: Number },
    height: { type: Number },

    xDomain: { type: Array },
    xRange: { type: Array },
    yDomain: { type: Array },
    yRange: { type: Array },
    xPadding: { type: String },
    yLabel: { type: String },
    color: { type: String },
    interactive: { type: Boolean },
    onSelect: { type: Function }
  };

  get view_settings() {
    return {
      "title": this.title,
      "marginTop": this.marginTop,
      "marginRight": this.marginRight,
      "marginBottom": this.marginBottom,
      "marginLeft": this.marginLeft,
      "xDomain": this.xDomain,
      "xRange": this.xRange,
      "yDomain": this.yDomain,
      "yRange": this.yRange,
      "yLabel": this.yLabel,
      "color": this.color,
      "interactive": this.interactive,
      "onSelect": this.onSelect,

      ...(this.width) && { "width": this.width },
      ...(this.height) && { "height": this.height }
    }
  }

  get settings() {
    return this.view_settings
  }

  connectedCallback() {
    super.connectedCallback()
  }

  willUpdate(changedProperties) {

  }

  constructor() {
    super();
    this.title; // given d in data, returns the title text
    this.marginTop = 20; // the top margin, in pixels
    this.marginRight = 0; // the right margin, in pixels
    this.marginBottom = 30; // the bottom margin, in pixels
    this.marginLeft = 40; // the left margin, in pixels
    this.width = undefined; // the outer width of the chart, in pixels
    this.height = undefined; // the outer height of the chart, in pixels
    this.xDomain;// an array of (ordinal) x-values
    this.xRange = undefined;//= [this.marginLeft, this.width - this.marginRight]; // [left, right]
    this.yDomain; // [ymin, ymax]
    this.yRange = undefined; //= [this.height - this.marginBottom, this.marginTop]; // [bottom, top]
    this.yLabel; // a label for the y-axis
    this.color = "steelblue"; // mark fill color
    this.interactive = false; // visual mark is selectable?
    this.onSelect = () => { };
  }

  // height="${this.height - 2 * this.padding}"
  render() {
    return html`<p>You should not see this</p>`;
  }
}
customElements.define('chart-view', ChartView);
