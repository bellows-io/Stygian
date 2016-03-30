"use strict";

class Sequence {
	constructor() {
		this._noteTimes = [];
	}
	addNote(note, time) {
		this._noteTimes.push({ note, time });
		this._noteTimes.sort((a, b) => {
			return a.time - b.time;
		});
		return this;
	}
	makePlayer(callback) {
		return new Sequence.Player(this, callback);
	}
	notesBetween(startMilliseconds, endMilliseconds) {
		var out = [], i;
		for (i = 0; i < this._noteTimes.length; i++) {
			let time = this._noteTimes[i].time;
			if (startMilliseconds <= time && time <= endMilliseconds) {
				out.push(this._noteTimes[i].note);
			} else if (time > endMilliseconds) {
				break;
			}
		}
		return out;
	}
	lastNoteTime() {
		if (! this._noteTimes.length) {
			throw new Error("No notes yet");
		}
		var last = this._noteTimes[this._noteTimes.length - 1];
		return last.time + last.note.duration;
	}
}

Sequence.Player = class {
	constructor(sequence, callback) {
		this._sequence = sequence;
		this._callback = callback;
		this._time = 0;
	}
	play() {
		var started = (new Date() - this._time),
			last = 0;
		clearInterval(this._interval);
		this._interval = setInterval(() => {
			var now = (new Date()) - started,
				notes = this._sequence.notesBetween(last, now);
			// console.log(last, now, this._sequence.lastNoteTime(), this._sequence.notesBetween(last, now));
			if (this._sequence.lastNoteTime() < now) {
				// console.log('stopping');
				this.stop();
			}
			last = now;
			if (notes.length) {
				notes.forEach((note) => {
					this._callback.call(null, note);
				});
			}
		}, 30);
	}
	stop() {
		this.pause();
		this._time = 0;
	}
	pause() {
		clearInterval(this._interval);
	}

}

export { Sequence };