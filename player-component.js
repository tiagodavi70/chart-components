// player-component.js
import {html, css, svg, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import CustomPlayer from './player.js';

class TimePlayer extends LitElement {

  static properties = {
    finalValue : {"type": Number},
    timeStep : {"type": Number},
    currentValue : {"type": Number},
    loop : {"type": Boolean},
    isPlaying : {"type": Boolean},
  };

  constructor() {
    super();
    this.finalValue = 10;
    this.timeStep = 100;
    this.currentValue = 0;
    this.loop = false;
    this.isPlaying = false;

    this.addCallback = cb => {
      this.player.addCallback(cb);
    }
    this.player = new CustomPlayer({});
    this.player.addCallback((value) => {
      this.currentValue = value;
    });
    this.player.onStop = () => {
      this.isPlaying = false;
      // this.requestUpdate();
    };
  }

  static styles = css`
    :host {
      display: block;
    }
    .play::before {
      content: "▶";
    }
    .pause::before {
      content: "⏸";
    }
    .stop::before {
      content: "⏹";
    }
    .sized {
      width: 8vw;
    }
  `;
  

  willUpdate() {    
    this.player.currentValue = this.currentValue;
    this.player.finalValue = this.finalValue;
    this.player.timeStep = this.timeStep;
    this.player.loop = this.loop;
  }

  render() {

    return html`
      <input type="number" class="sized"
        .value=${this.currentValue}
        @input="${this.handleChange}"
      ></input>
      <button @click="${this.togglePlayPause}" class="${!this.isPlaying ? "play": "pause"}"></button>
      <button @click="${this.stop}" class="stop"></button>
      <input type="range" min="0" max="${this.finalValue}"
        .value=${this.currentValue}
        @input="${this.handleChange}"
      />
      <label for="loop">Loop</label>
      <input type="checkbox" id="loop"
        .checked="${this.loop}"
        @change="${this.handleLoopChange}"
      ></sl-checkbox>
    `;
  }

  handleLoopChange(event) {
    this.loop = event.target.checked;
    this.player.loop = this.loop;
  }

  togglePlayPause() {
    console.log(this.isPlaying ? "play" : "pause")
    if (this.isPlaying) {
      this.player.pause();
    } else {
      this.player.start();
    }
    this.isPlaying = !this.isPlaying;
  }

  stop() {
    this.player.stop();
    this.isPlaying = false;
  }

  handleChange(event) {
    this.currentValue = parseInt(event.target.value, 10);
    this.player.rewind(this.currentValue);
  }

}

customElements.define('time-player', TimePlayer);
