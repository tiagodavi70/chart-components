// player.js
class CustomPlayer {
	constructor(options) {
		this._finalValue = options.finalValue || 100;
		this._timeStep = options.timeStep || 1000;
		this._onStop = options.onStop || null;
		this._loop = options.loop || false;
		this._currentValue = 0;
		this._intervalId = null;
		this._isPaused = false;
		this._callback = options.callback;
	}

	get finalValue() {
		return this._finalValue;
	}

	set finalValue(value) {
		this._finalValue = value;
	}

	get timeStep() {
		return this._timeStep;
	}

	set timeStep(value) {
		this._timeStep = value;
	}

	get loop() {
		return this._loop;
	}

	set loop(value) {
		this._loop = value;
	}

	get currentValue() {
		return this._currentValue;
	}

	set currentValue(value) {
		this._currentValue = value;
		if (this._currentValue > this._finalValue) {
			if (this._loop) {
				this.currentValue = 1;
			} else {
				this.stop();
			}
		} else {
			this._callback(value);
		}
	}

	start() {
		if (!this._intervalId) {
			this._intervalId = setInterval(() => {
				if (!this._isPaused) {
					this.currentValue += 1;			
				}
			}, this._timeStep);
		} else {
			this.resume();
		}
	}

	pause() {
		this._isPaused = true;
	}

	resume() {
		this._isPaused = false;
	}

	stop() {
		this.currentValue = 0;
		this._isPaused = true;
		if (this._onStop) {
			this._onStop(this.currentValue);
		}
	}
}

export default CustomPlayer;
