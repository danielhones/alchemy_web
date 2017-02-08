var AlchemyOptions = function AlchemyOptions() {
    this.tonality = MAJOR;
    this.num_notes = 2;
    var db;
    var that = this;

    (function initialize() {
	open_database();
	register_modal_functions();
	document.getElementById("num_notes-select").setAttribute("max", MAX_NUM_NOTES);
    })();
    
    this.load_values = function() {
	if (!db) { return; }

	var transaction = db.transaction(ALCHEMY_OPTIONS_STORE, "readwrite");
	var options_store = transaction.objectStore(ALCHEMY_OPTIONS_STORE);
	
	options_store.get("tonality").onsuccess = function(event) {
	    set_tonality(event.target.result.value);
	    console.log("Loaded tonality from db: ", that.tonality);
	};
	options_store.get("num_notes").onsuccess = function(event) {
	    set_num_notes(event.target.result.value);
	    console.log("Loaded num_notes from db: ", that.num_notes);
	};
    };

    this.save_values = function() {
	if (!db) { return; }  // TODO: Maybe call open_database here?
	console.log("saving values...");
	var transaction = db.transaction(ALCHEMY_OPTIONS_STORE, "readwrite");
	var options_store = transaction.objectStore(ALCHEMY_OPTIONS_STORE);
	options_store.put({key: "tonality", value: that.tonality});
	options_store.put({key: "num_notes", value: that.num_notes});
	update_view();
    };

    this.show_modal = function() {
	show_modal("options-view");
    };

    function open_database() {
	console.log("Opening database for options...");
	var db_request = window.indexedDB.open(ALCHEMY_DATABASE, DATABASE_VERSION);
	db_request.onerror = function() {
	    console.log("Couldn't open " + ALCHEMY_DATABASE + " continuing without it");
	    db = false;
	};
	db_request.onupgradeneeded = function(event) {
	    db = event.target.result;
            try {
	        db.createObjectStore(ALCHEMY_OPTIONS_STORE, {keyPath: "key"});
            } catch (e) {
                //
            }
	};
	db_request.onsuccess = function(event) {
	    db = event.target.result;
	    that.load_values();
	};
    }

    function set_num_notes(new_num_notes) {
	if (isNaN(new_num_notes)) {
	    console.error("Tried to set num_notes to invalid value:", new_num_notes);
	    return;
	}
	if (new_num_notes > 0 && new_num_notes <= MAX_NUM_NOTES) {
	    that.num_notes = new_num_notes;
	    that.save_values();
	    update_view();
	}
    }

    function set_tonality(new_tonality) {
	that.tonality = new_tonality;
	that.save_values();
	update_view();
    }

    function update_view() {
	document.getElementById("tonality-select").value = that.tonality.toString();
	document.getElementById("num_notes-select").value = that.num_notes.toString();
    }
    
    function register_modal_functions() {
	document.getElementById("tonality-select").addEventListener("change", function(event) {
	    set_tonality(parseInt(this.value, 10));
	});
	document.getElementById("num_notes-select").addEventListener("change", function(event) {
	    set_num_notes(parseInt(this.value, 10));
	});
    }
};
