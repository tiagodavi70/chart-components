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
		this._callbacks = options.callbacks || [];
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
		if (this._callbacks.length > 0) {
			for (let cb of this._callbacks) {
				cb(this.currentValue);
			}
		}
	}

	start() {
		if (!this._intervalId) {
			this._intervalId = setInterval(() => {
				if (!this._isPaused) {
					this.currentValue += 1;
					if (this._currentValue >= this._finalValue) {
						if (this._loop) {
							this.currentValue = 0;
						} else {
							this.stop();
						}
					}
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

	rewind(value) {
		if (!this._isPaused) {
			this.currentValue = value;
			if (this.currentValue >= this._finalValue) {
				if (this._loop) {
					this.currentValue = 0;
				} else {
					this.currentValue = this._finalValue;
					this.pause();
				}
			}
		}
		this.valueChanged();
	}

	addCallback(cb) {
		this._callbacks.push(cb);
	}
}

export default CustomPlayer;
