"use strict";

class Oscillator {
	constructor(audioContext) {
		this._oscillator = audioContext.createOscillator();
	}
	setType(type) {
		this._oscillator.type = type;
		return this;
	}
	getAudioNode() {
		return this._oscillator;
	}
	setFrequency(hertz) {
		this._oscillator.frequency.value = hertz;
		return this;
	}
	on() {
		this._oscillator.start();
		return this;
	}
	off() {
		this._oscillator.stop();
		return this;
	}
}

Oscillator.SINE     = 'sine';
Oscillator.SQUARE   = 'square';
Oscillator.SAWTOOTH = 'sawtooth';
Oscillator.TRIANGLE = 'triangle';

export { Oscillator };
