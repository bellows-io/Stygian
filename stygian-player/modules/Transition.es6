"use strict";


class Transition {
	constructor(valueGetterFn, valueSetterFn) {
		this._valueGetterFn = valueGetterFn;
		this._valueSetterFn = valueSetterFn;
	}
	transitionTo(value, milliseconds, callback = null) {
		if (this._lastChange) {
			this._lastChange.stop();
		}
		return (this._lastChange = new Transition.Change(value, milliseconds, this._valueGetterFn, this._valueSetterFn, callback)).run();
	}
}

Transition.Change = class {
	constructor(targetValue, milliseconds, valueGetterFn, valueSetterFn, callbackFn) {
		this._targetValue   = targetValue;
		this._milliseconds  = milliseconds;
		this._valueGetterFn = valueGetterFn;
		this._valueSetterFn = valueSetterFn;
		this._callbackFn    = callbackFn;
	}
	stop() {
		clearInterval(this._interval);
		return this;
	}
	run() {
		var now = new Date(),
			fromValue = this._valueGetterFn();

		this.stop();
		this._interval = setInterval(() => {
			var dt = (new Date()) - now,
				percentage = Math.min(1, dt / this._milliseconds),
				value = (percentage * (this._targetValue - fromValue)) + fromValue;
			this._valueSetterFn.call(null, value);

			if (percentage == 1) {
				this._callbackFn.call(null);
				this.stop();
			}
		}, 1);

		return this;
	}
	transitionTo(value, milliseconds, callback = null) {
		if (this._nextChange) {
			throw new Error("Can't re-glide");
		}
		return (this._nextChange = new Transition.Change(value, milliseconds, this._valueGetterFn, this._valueSetterFn, callback)).run();
	}
}

export { Transition };