import {html, css, svg, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {LineChart} from './LineChart.js';
import {ChartView} from './chart-view.js';

export class LineChartView extends ChartView {
  static styles = css``;

  static properties = {
    data: {type: String}
  };

  constructor() {
    super();
    this.data = [{x:1, y:20, z:"a"}, {x:1, y:10, z:"b"}, {x:2, y:30, z:"a"}, {x:2, y:50, z:"b"}];
    this.z = d => d.z;
    this.y = d => d.y;
    this.x = d => d.x;
    this.xType = d3.scaleLinear;
    this.voronoi = false;
  }

  get settings() {
    return { ...(this.view_settings),
      x: this.x,
      y: this.y,
      z: this.z,
      xType: this.xType,
      voronoi: this.voronoi
    }    
  }

  render() {
    return html`${LineChart(this.data, this.settings)}`;
  }

}
customElements.define('linechart-view', LineChartView);
