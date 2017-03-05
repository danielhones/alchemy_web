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
    this.cadences = {};
    this.cadences[MAJOR] = [new Audio('audio/cadences/Cmajor.ogg')];
    this.cadences[MINOR] = [new Audio('audio/cadences/Cminor.ogg')];
    this.current_cadence = 0;  // For now we only use the key of C major or minor
    this.current_notes = [];
    this.tonality = MAJOR;
    var that = this;

    this.set_tonality = function(new_tonality) {
	that.tonality = new_tonality;
    };
    
    this.check_answer = function(answer) {
	if (answer.length !== that.current_notes.length) {
	    return false;
	}
	console.log("Checking answer: ", answer);
	var wrong_notes = array_difference(answer, that.current_notes);
	return wrong_notes;
    };

    this.play_new_question = function(num_notes, allowed_notes) {
	select_new_notes(num_notes, allowed_notes);
	that.play_question();
    };

    this.play_question = function() {
	if (that.current_notes.length === 0) {
	    return;
	}
	info("Current notes: ", that.current_notes);
        c = that.cadences[that.tonality][that.current_cadence];
	c.currentTime = 0;
        c.addEventListener('ended', function(e) {
            this.removeEventListener('ended', arguments.callee);
            that.play_notes();
        });
	c.play();
    };

    this.play_notes = function() {
	that.current_notes.forEach(function(note_index) {
	    notes[note_index].currentTime = 0;
	    notes[note_index].play();
	});
    };

    this.get_answer = function() {
	return that.current_notes;
    };

    this.stop_sound = function() {
	that.cadences[that.tonality][that.current_cadence].pause();
	that.current_notes.forEach(function(note_index) {
	    notes[note_index].pause();
	});
    };

    function select_new_notes(num_notes, allowed_notes) {
	var available_notes = allowed_notes.slice();
	that.current_notes = [];
	
	for (var i = 0; i < num_notes; i++) {
	    var random_choice = Math.floor(Math.random() * available_notes.length);
	    var new_note = available_notes.splice(random_choice, 1)[0];
	    that.current_notes.push(new_note);
	}
	that.current_notes.sort(sort_number);
    };

};

exports.AlchemyQuestion = AlchemyQuestion;
