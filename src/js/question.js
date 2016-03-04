var AlchemyQuestion = function AlchemyQuestion() {
    var DURATION_OF_CADENCE = 4000;
    var notes = [
	new Audio('audio/notes/C4.ogg'),
	new Audio('audio/notes/Db4.ogg'),
	new Audio('audio/notes/D4.ogg'),
	new Audio('audio/notes/Eb4.ogg'),
	new Audio('audio/notes/E4.ogg'),	
	new Audio('audio/notes/F4.ogg'),
	new Audio('audio/notes/Gb4.ogg'),
	new Audio('audio/notes/G4.ogg'),
	new Audio('audio/notes/Ab4.ogg'),
	new Audio('audio/notes/A4.ogg'),
	new Audio('audio/notes/Bb4.ogg'),
	new Audio('audio/notes/B4.ogg')
    ];
    var cadences = {};
    cadences[MAJOR] = [new Audio('audio/cadences/Cmajor.ogg')];
    cadences[MINOR] = [new Audio('audio/cadences/Cminor.ogg')];
    var current_cadence = 0;  // For now we only use the key of C major or minor
    var current_notes = [];
    var tonality = MAJOR;
    var that = this;

    this.set_tonality = function(new_tonality) {
	tonality = new_tonality;
    };
    
    this.select_new_notes = function(num_notes, allowed_notes) {
	var available_notes = allowed_notes.slice(0, allowed_notes.length);
	current_notes = [];
	
	for (var i = 0; i < num_notes; i++) {
	    var random_choice = Math.floor(Math.random() * available_notes.length);
	    var new_note = available_notes.splice(random_choice, 1)[0];
	    current_notes.push(new_note);
	}
	current_notes.sort(sort_number);
    };

    this.check_answer = function(answer) {
	return (current_notes.sort(sort_number).toString() === answer.sort(sort_number).toString());
    };

    this.play_question = function() {
	cadences[tonality][current_cadence].play();
	setTimeout(that.play_notes, DURATION_OF_CADENCE);
    };

    this.play_notes = function() {
	console.log("played notes: ", current_notes);
	current_notes.forEach(function(note_index) {
	    notes[note_index].play();
	});
    };

    this.stop_sound = function() {
	current_notes.forEach(function(note_index) {
	    notes[note_index].stop();
	});
	cadences[tonality][current_cadence].stop();
    };
};