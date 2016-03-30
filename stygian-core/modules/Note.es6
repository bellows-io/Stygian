"use strict";

class Note {

	constructor(note, velocity, duration) {
		this.note     = note;
		this.velocity = velocity;
		this.duration = duration;
	}

}

Note.toFrequency = function(midi) {
	return Math.pow(2, (midi - 69) / 12) * 440;
}

Note.Notes = {};

var notes = {C: 0, Csharp: 1, Dflat: 1, D: 2, Dsharp: 3, Eflat: 3, E: 4, F: 5, Fsharp: 6, Gflat: 6, G: 7, Gsharp: 8, Aflat: 8, A: 9, Asharp:10, Bflat: 10, B: 11};
for (var i = 0; i < 10; i++) {
	Object.keys(notes).forEach(name => {
		Note[name + (i + 1)] = (i * 12) + notes[name];
	});
}

export { Note };