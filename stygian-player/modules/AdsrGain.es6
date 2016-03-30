"use strict";

import { Transition } from "./Transition.es6";

class AdsrGain {
	constructor(audioContext, attackMilliseconds, decayMilliseconds, sustainPercentage, releaseMilliseconds) {

		this._gainNode = audioContext.createGain();
		this._valueTransition = new Transition(
			() => { return this._gainNode.gain.value; },
			(value) => { this._gainNode.gain.value = value; }
		);
		this._active = false;
		this._gainNode.gain.value = 0;
		this.attackMilliseconds  = attackMilliseconds;
		this.decayMilliseconds   = decayMilliseconds;
		this.sustainPercentage   = sustainPercentage;
		this.releaseMilliseconds = releaseMilliseconds;
	}
	getAudioNode() {
		return this._gainNode;
	}
	attack(gainValue) {
		this._active = true;
		this._valueTransition
			.transitionTo(gainValue, this.attackMilliseconds)
			.transitionTo(this.sustainPercentage * gainValue, this.decayMilliseconds);
	}
	release() {
		this._valueTransition
			.transitionTo(0, this.releaseMilliseconds, () => {
				this._active = false
			});
	}
	isActive() {
		return this._active;
	}
}

export { AdsrGain };
