var AlchemyPreferences = function AlchemyPreferences() {
    this.available_notes = {};
    this.available_notes[MAJOR] = MAJOR_DIATONIC_NOTES;
    this.available_notes[MINOR] = MINOR_DIATONIC_NOTES;
    var that = this;
    
    var db;
    var DB_MAJOR_NOTES_INDEX = "major_available_notes";
    var DB_MINOR_NOTES_INDEX = "minor_available_notes";
    var preferences_note_buttons = document.querySelectorAll("#preferences-view div[data-index]");
    
    (function initialize() {
	open_database();
	register_click_functions();
    })();
    
    this.load_values = function() {
	if (!db) { return; }

	var transaction = db.transaction(ALCHEMY_PREFERENCES_STORE, "readwrite");
	var preferences_store = transaction.objectStore(ALCHEMY_PREFERENCES_STORE);
	preferences_store.get(DB_MAJOR_NOTES_INDEX).onsuccess = function(event) {
	    that.available_notes[MAJOR] = event.target.result.value;
	    console.log("Loaded major notes from db: ", that.available_notes[MAJOR]);
	};
	preferences_store.get(DB_MINOR_NOTES_INDEX).onsuccess = function(event) {
	    that.available_notes[MINOR] = event.target.result.value;
	    console.log("Loaded minor notes from db: ", that.available_notes[MINOR]);
	};
	update_preferences_view();
    };
    
    this.save_values = function() {
	if (!db) { return; }
	
	var transaction = db.transaction(ALCHEMY_PREFERENCES_STORE, "readwrite");
	var preferences_store = transaction.objectStore(ALCHEMY_PREFERENCES_STORE);
	preferences_store.put({key: DB_MAJOR_NOTES_INDEX, value: that.available_notes[MAJOR]});
	preferences_store.put({key: DB_MINOR_NOTES_INDEX, value: that.available_notes[MINOR]});
    };

    function open_database() {
	console.log("Opening database for preferences...");
	var db_request = window.indexedDB.open(ALCHEMY_DATABASE, DATABASE_VERSION);
	db_request.onerror = function() {
	    console.log("Couldn't open " + ALCHEMY_DATABASE + " continuing without it");
	    db = false;
	};
	db_request.onupgradeneeded = function(event) {
	    db = event.target.result;
	    db.createObjectStore(ALCHEMY_PREFERENCES_STORE, {keyPath: "key"});
	};
	db_request.onsuccess = function(event) {
	    db = event.target.result;
	    that.load_values();
	};
    }

    function register_click_functions() {
	for (var i = 0; i < preferences_note_buttons.length; i++) {
	    preferences_note_buttons[i].onclick = update_available_notes;
	}
    }

    this.show_modal = function() {
	update_preferences_view();
	show_modal("preferences-view");
    };
    
    function update_available_notes(event) {
	var note_index = parseInt(this.getAttribute("data-index"), 10);
	var note_tonality = parseInt(this.getAttribute("data-tonality"), 10);
	var note_already_enabled = that.available_notes[note_tonality].indexOf(note_index) >= 0;

	if (note_already_enabled) {
	    // remove from array
	    that.available_notes[note_tonality].splice(that.available_notes[note_tonality].indexOf(note_index), 1);
	} else {
	    that.available_notes[note_tonality].push(note_index);
	    that.available_notes[note_tonality].sort(sort_number);
	}
	that.save_values();
	update_preferences_view();
    }

    function update_preferences_view() {
	for (var i = 0; i < preferences_note_buttons.length; i++) {
	    var note_tonality = preferences_note_buttons[i].getAttribute("data-tonality");
	    var note_index = parseInt(preferences_note_buttons[i].getAttribute("data-index"), 10);
	    if (that.available_notes[note_tonality].indexOf(note_index) >= 0) {
		preferences_note_buttons[i].setAttribute("data-enabled", "true");
	    } else {
		
		preferences_note_buttons[i].setAttribute("data-enabled", "false");
	    }
	}
    }

    this.reset_to_defaults = function() {
	that.available_notes[MAJOR] = MAJOR_DIATONIC_NOTES;
	that.available_notes[MINOR] = MINOR_DIATONIC_NOTES;
	that.save_values();
    };
};
