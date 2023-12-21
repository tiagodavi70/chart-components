import { html, css, svg, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { Sunburst } from './Sunburst.js';
import { ChartView } from './chart-view.js';

export class SunburstView extends ChartView {
    static styles = css``;

    static properties = {
        data: { type: String },
        hierarchy: { type: Array }
    };

    constructor() {
        super();
        this.data = [{ "col1": "a", "col2": 1, "col3": "aa", "value": 3 }, { "col1": "a", "col2": 2, "col3": "aa", "value": 2 },
        { "col1": "a", "col2": 3, "col3": "bb", "value": 3 }, { "col1": "a", "col2": 4, "col3": "bb", "value": 6 },
        { "col1": "b", "col2": 1, "col3": "cc", "value": 2 }, { "col1": "b", "col2": 2, "col3": "cc", "value": 3 },
        { "col1": "b", "col2": 3, "col3": "dd", "value": 1 }, { "col1": "b", "col2": 4, "col3": "dd", "value": 3 }];
        this.hierarchy = ["col1", "col2", "col3"];
        this.color = d3.interpolateRainbow;
        this.width = 640;
        this.height = 640;
    }

    get settings() {
        return {
            ...(this.view_settings),
            color: this.color
        }
    }

    willUpdate(changedProperties) {
        if (changedProperties.has('data') || changedProperties.has('hierarchy')) {
            this.nestedData = formatData(this.data, this.hierarchy);
            console.log(this.nestedData);
        }
    }

    render() {
        //console.log(this.settings);
        return html`${Sunburst(this.nestedData, this.settings)}`;
    }
}

// https://observablehq.com/@bayre/unrolling-a-d3-rollup#nest
function nest(rollup) {
    return Array.from(rollup, ([key, value]) =>
        value instanceof Map
            ? { name: key, children: nest(value) }
            : { name: key, value: value }
    );
}

function formatData(data, columns, metric = "sum", valueKey = "value") {

    let keys = columns.map(col => ((d) => d[col]));
    let rollup = d3.rollup(data, v => d3.sum(v, d => d[valueKey]), ...keys)

    return { name: " ", children: nest(rollup) };
}


customElements.define('sunburst-view', SunburstView);
