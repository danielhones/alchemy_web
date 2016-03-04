var AlchemyQuestion = function AlchemyQuestion() {
    var notes = [
	//new Audio('audio/C4.ogg'),
    ];
    var cadences = {};
    cadences[MAJOR] = [];
    cadences[MINOR] = [];
    var current_cadence = 0;  // For now we only use the key of C major or minor
    var current_notes = [];
    var tonality;
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
	play_cadence();
	that.play_notes();
    };

    this.play_notes = function() {
	console.log("played notes: ", current_notes);
	/*
	current_notes.forEach(function(note_index) {
	    notes[note_index].play();
	});
	*/
    };

    this.stop_sound = function() {
	/*
	current_notes.forEach(function(note_index) {
	    notes[note_index].stop();
	});
	cadences[tonality][current_cadence].stop();
	*/
    };

    function play_cadence() {
	console.log("played cadence");
 	// cadences[tonality][current_cadence].play()
    }
};
