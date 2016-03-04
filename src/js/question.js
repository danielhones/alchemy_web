var AlchemyQuestion = function AlchemyQuestion() {
    var notes = [
	new Audio('audio/C3.ogg'),
    ];
    var cadences = [
	[],
	[]
    ];  
    var current_cadence = 0;  // For now we only use the key of C major or minor
    var current_notes;
    var that = this;

    this.select_new_notes = function(num_notes) {
	notes = [];
	
    };

    this.check_answer = function(answer) {
	return (current_notes.sort(sort_number) === answer.sort(sort_number));
    };

    this.play_question = function() {
	play_cadence();
	play_notes();l
    };

    this.play_cadence() = function() {

    };

    this.play_notes = function() {

    };
};
