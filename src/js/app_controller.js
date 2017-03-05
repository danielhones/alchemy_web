var AppController = function AppController() {
    var repeat_question_button = document.getElementById("repeat-question-button");
    var repeat_notes_button = document.getElementById("repeat-notes-button");
    var next_question_button = document.getElementById("next-question-button");
    var show_answer_button = document.getElementById("show-answer-button");
    var check_answer_button = document.getElementById("check-answer-button");
    var start_button = document.getElementById("start-button");
    var app_buttons = document.querySelectorAll("#app-buttons button.app-button");
    var note_buttons = document.querySelectorAll("#notes-container button[id^=note]");

    var options = new AlchemyOptions();
    var preferences = new AlchemyPreferences();
    var question = new AlchemyQuestion();
    var selected_notes = [];  // This is an array containing the indexes of selected note buttons
    var play_cadence_this_time = true;

    // Constants for setting note button status:
    var SELECTED_STATUS = "selected";
    var NO_STATUS = "none";
    var RIGHT_STATUS = "right";
    var WRONG_STATUS = "wrong";
    var ANSWER_STATUS = "answer";
    var TIME_AFTER_ANSWER_CHECK = 2000;
    var KEYBINDINGS = {
	"Space": check_answer,
	"KeyZ": reset_note_buttons,
	"Enter": hide_start_and_enable_others
    };
    
    var that = this;

    this.initialize = function initialize() {
	register_click_functions();

	document.addEventListener("keydown", function(event) {
	    var no_mod_keys = !(event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
	    if (KEYBINDINGS.hasOwnProperty(event.code) && no_mod_keys) {
		event.preventDefault();
	    }
	});
	
	document.addEventListener("keyup", function(event) {
	    var no_mod_keys = !(event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
	    if (KEYBINDINGS.hasOwnProperty(event.code) && no_mod_keys) {
		event.preventDefault();
		KEYBINDINGS[event.code]();
	    }
	});
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

	document.getElementById("options-button").onclick = function() {
	    question.stop_sound();
	    show_start_and_disable_others();
	    options.show_modal();
	};
	document.getElementById("preferences-button").onclick = function() {
	    question.stop_sound();
	    show_start_and_disable_others();
	    preferences.show_modal();
	};	
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
	selected_notes = [];
	for (var i = 0; i < note_buttons.length; i++) {
	    note_buttons[i].setAttribute("data-status", NO_STATUS);
	}
    }

    function repeat_question(event) {
	question.play_question();
    }
    
    function repeat_notes(event) {
	question.play_notes();
    }
    
    function next_question(event) {
	show_answer();
	play_new_question();
    }
    
    function show_answer(event) {
	reset_note_buttons();
	var answer = question.get_answer();
	set_notes(answer, ANSWER_STATUS);
	selected_notes = [];
    }
    
    function check_answer(event) {
	if (selected_notes.length === 0) {
	    return;
	}
	
	var wrong_notes = question.check_answer(selected_notes);
	console.log("Wrong notes: ", wrong_notes);

	if (wrong_notes.length === 0) {
	    set_notes(selected_notes, RIGHT_STATUS);
	    play_new_question();
	} else {
	    var right_notes = array_difference(selected_notes, wrong_notes);
	    console.log("Right notes: ", right_notes);
	    set_notes(right_notes, RIGHT_STATUS);
	    set_notes(wrong_notes, WRONG_STATUS);
	    window.setTimeout(function(){set_notes(selected_notes, SELECTED_STATUS);}, TIME_AFTER_ANSWER_CHECK);
	}

    }

    function start_session(event) {
	hide_start_and_enable_others();
	play_cadence_this_time = true;
	play_new_question();
    }
    
    function stop_session() {
	question.stop_sound();
	show_start_and_disable_others();
    }

    function play_new_question() {
	window.setTimeout(reset_note_buttons, TIME_AFTER_ANSWER_CHECK);
	question.set_tonality(options.tonality);
	question.play_new_question(options.num_notes, preferences.available_notes[options.tonality]);
    }

    function note_button_click(event) {
	var was_selected = (this.getAttribute("data-status").toLowerCase() === SELECTED_STATUS);
	var note_index = parseInt(this.getAttribute("data-note-index"), 10);

	if (was_selected === true) {
	    selected_notes.splice(selected_notes.indexOf(note_index), 1);
	    this.setAttribute("data-status", NO_STATUS);
	} else if (selected_notes.length < options.num_notes) {
	    selected_notes.push(note_index);
	    this.setAttribute("data-status", SELECTED_STATUS);
	}
	
	selected_notes.sort(sort_number);
	return note_index;
    }

    function set_notes(notes, status) {
	notes.forEach(function(note_index) {
	    note_buttons[note_index].setAttribute("data-status", status);
	});
    }

};


remove_hover_effect_for_touch_devices("/css/style-min.css");
var app = new AppController();
app.initialize();


exports.AppController = AppController;
