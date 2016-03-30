"use strict";

import { AdsrGain } from "./AdsrGain.es6";
import { Oscillator } from "./Oscillator.es6";

var Note = Stygian.Note;

class SimpleAdsrKeyboard {
	constructor(audioContext, oscillatorType, attackMilliseconds, decayMilliseconds, sustainPercentage, releaseMilliseconds, numBanks = 6) {

		this._banks = [];

		for (let i = 0; i < numBanks; i++) {
			this._banks.push(new SimpleAdsrKeyboard.Bank(audioContext, oscillatorType, attackMilliseconds, decayMilliseconds, sustainPercentage, releaseMilliseconds));
		}
	}
	getInactiveBank() {
		return this._banks.reduce((inactive, bank) => {
			return bank.isActive() ? inactive : bank;
		}, null);
	}
	playNote(note) {
		var inactive;
		if (inactive = this.getInactiveBank()) {
			inactive.playNote(note);
		}
	}
}

SimpleAdsrKeyboard.Bank = class {
	constructor(audioContext, oscillatorType, attackMilliseconds, decayMilliseconds, sustainPercentage, releaseMilliseconds) {

		this.oscillator = (new Oscillator(audioContext)).setType(oscillatorType);
		this.adsrGain = (new AdsrGain(audioContext, attackMilliseconds, decayMilliseconds, sustainPercentage, releaseMilliseconds));

		this.oscillator.on();
		this.oscillator.getAudioNode().connect(this.adsrGain.getAudioNode());
		this.adsrGain.getAudioNode().connect(audioContext.destination);
	}
	isActive() {
		return this.adsrGain.isActive();
	}
	playNote(note) {
		this.oscillator.setFrequency(Note.toFrequency(note.note));

		this.adsrGain.attack(note.velocity);

		setTimeout(() => {
			this.adsrGain.release();
		}, note.duration);
	}
}

export { SimpleAdsrKeyboard };