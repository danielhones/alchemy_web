var AppController = function AppController() {
    var repeat_question_button = document.getElementById("repeat-question-button");
    var repeat_notes_button = document.getElementById("repeat-notes-button");
    var next_question_button = document.getElementById("next-question-button");
    var show_answer_button = document.getElementById("show-answer-button");
    var check_answer_button = document.getElementById("check-answer-button");
    var start_button = document.getElementById("start-button");
    var app_buttons = document.querySelectorAll("#app-buttons button");
    var note_buttons = document.querySelectorAll("#notes-container button[id^=note]");

    var options = new AlchemyOptions();
    var preferences = new AlchemyPreferences();
    var question = new AlchemyQuestion();
    var selected_notes = [];  // This is an array containing the indexes of selected note buttons
    var total_questions = 0;
    var play_cadence_this_time = true;
    var number_right = 0;
    var that = this;

    this.initialize = function initialize() {
	register_click_functions();
	options.load_values();
	preferences.load_values();
	show_start_and_disable_others();
    };

    function register_click_functions() {
	repeat_question_button.onclick = repeat_question;
	repeat_notes_button.onclick = repeat_notes;
	next_question_button.onclick = next_question;
	show_answer_button.onclick = show_answer;
	check_answer_button.onclick = check_answer;
	start_button.onclick = start_session;

	for (var i = 0; i < note_buttons.length; i++) {
	    note_buttons[i].setAttribute("data-status", "none");
	    note_buttons[i].onclick = note_button_click;
	}
    }

    function show_start_and_disable_others() {
	for (var i = 0; i < app_buttons.length; i++) {
	    app_buttons[i].disabled = true;
	}
	start_button.disabled = false;
	start_button.style.visibility = "visible";
    }

    function hide_start_and_enable_others() {
	for (var i = 0; i < app_buttons.length; i++) {
	    app_buttons[i].disabled = false;
	}
	start_button.style.visibility = "hidden";
    }

    function reset_note_buttons() {
	for (var i = 0; i < note_buttons.length; i++) {
	    note_buttons[i].setAttribute("data-status", "none");
	}
    }

    function repeat_question(event) {}
    function repeat_notes(event) {}
    function next_question(event) {}
    function show_answer(event) {}
    
    function check_answer(event) {
	console.log("selected notes: ", selected_notes);
	var wrong_notes = question.check_answer(selected_notes);
	console.log("Wrong notes: ", wrong_notes);

	if (wrong_notes.length === 0) {
	    highlight_notes(selected_notes, GREEN);
	    total_questions++;
	    number_right++;
	    play_new_question();
	} else {
	    var right_notes = array_difference(selected_notes, wrong_notes);
	    console.log("Right notes: ", right_notes);
	    highlight_notes(right_notes, GREEN);
	    highlight_notes(wrong_notes, RED);
	}
    }

    function start_session(event) {
	hide_start_and_enable_others();
	play_cadence_this_time = true;
	total_questions--;
	play_new_question();
    }
    
    function stop_session() {
	question.stop_sound();
	show_start_and_disable_others();
    }

    function play_new_question() {
	question.play_new_question(options.num_notes, preferences.available_notes[options.tonality]);
    }

    function note_button_click(event) {
	var was_selected = (this.getAttribute("data-status").toLowerCase() === "selected");
	var note_index = parseInt(this.getAttribute("data-note-index"), 10);

	if (was_selected === "true") {
	    selected_notes.splice(selected_notes.indexOf(note_index), 1);
	    this.setAttribute("data-status", "none");
	} else if (selected_notes.length < options.num_notes) {
	    selected_notes.push(note_index);
	    this.setAttribute("data-status", "selected");
	}
	
	selected_notes.sort(sort_number);
	return note_index;
    }

    function highlight_notes(notes, status) {
	
    }

};


var app = new AppController();
app.initialize();
