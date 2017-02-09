var AlchemyQuestion = function AlchemyQuestion() {
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
    var delayed_note_timeout;
    var current_cadence = 0;  // For now we only use the key of C major or minor
    var current_notes = [];
    var tonality = MAJOR;
    var that = this;

    this.set_tonality = function(new_tonality) {
	tonality = new_tonality;
    };
    
    this.check_answer = function(answer) {
	if (answer.length !== current_notes.length) {
	    return false;
	}
	console.log("Checking answer: ", answer);
	var wrong_notes = array_difference(answer, current_notes);
	return wrong_notes;
    };

    this.play_new_question = function(num_notes, allowed_notes) {
	select_new_notes(num_notes, allowed_notes);
	that.play_question();
    };

    this.play_question = function() {
	if (current_notes.length === 0) {
	    return;
	}
	info("Current notes: ", current_notes);
        c = cadences[tonality][current_cadence];
	c.currentTime = 0;
        c.addEventListener('ended', function(e) {
            this.removeEventListener('ended', arguments.callee);
            that.play_notes();
        });
	c.play();
    };

    this.play_notes = function() {
	current_notes.forEach(function(note_index) {
	    notes[note_index].currentTime = 0;
	    notes[note_index].play();
	});
    };

    this.get_answer = function() {
	return current_notes;
    };

    this.stop_sound = function() {
	window.clearTimeout(delayed_note_timeout);
	cadences[tonality][current_cadence].pause();
	current_notes.forEach(function(note_index) {
	    notes[note_index].pause();
	});
    };

    function select_new_notes(num_notes, allowed_notes) {
	var available_notes = allowed_notes.slice();
	current_notes = [];
	
	for (var i = 0; i < num_notes; i++) {
	    var random_choice = Math.floor(Math.random() * available_notes.length);
	    var new_note = available_notes.splice(random_choice, 1)[0];
	    current_notes.push(new_note);
	}
	current_notes.sort(sort_number);
    };

};
