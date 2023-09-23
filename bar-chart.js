import {html, css, svg, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {BarChart} from './BarChart.js';
import {ChartView} from './chart-view.js';

export class BarChartView extends ChartView { //LitElement
  static styles = css``;

  static properties = {
    data: {type: String}
  };

  constructor() {
    super();
    this.data = [8,9,10,6,5,7];
  }

  render() {

    return html`${BarChart(this.data, this.settings)}`;
  }

}
customElements.define('barchart-view', BarChartView);
