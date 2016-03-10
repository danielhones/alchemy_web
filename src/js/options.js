var AlchemyOptions = function AlchemyOptions() {
    this.tonality = MAJOR;
    this.num_notes = 2;
    var db;
    var that = this;

    (function initialize() {
	open_database();
	register_modal_functions();
    })();
    
    this.load_values = function() {
	if (!db) { return; }

	var transaction = db.transaction(ALCHEMY_OPTIONS_STORE, "readwrite");
	var options_store = transaction.objectStore(ALCHEMY_OPTIONS_STORE);
	
	options_store.get("tonality").onsuccess = function(event) {
	    that.tonality = event.target.result.value;
	    console.log("Loaded tonality from db: ", that.tonality);
	};
	options_store.get("num_notes").onsuccess = function(event) {
	    that.num_notes = event.target.result.value;
	    console.log("Loaded num_notes from db: ", that.num_notes);
	};
    };

    this.save_values = function() {
	if (!db) { return; }
	console.log("Saving options to database");
	var transaction = db.transaction(ALCHEMY_OPTIONS_STORE, "readwrite");
	var options_store = transaction.objectStore(ALCHEMY_OPTIONS_STORE);
	options_store.put({key: "tonality", value: that.tonality});
	options_store.put({key: "num_notes", value: that.num_notes});
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
	    db.createObjectStore(ALCHEMY_OPTIONS_STORE, {keyPath: "key"});
	};
	db_request.onsuccess = function(event) {
	    db = event.target.result;
	    that.load_values();
	};
    }
    
    function register_modal_functions() {
	document.getElementById("tonality-select").addEventListener("change", function(event) {
	    that.tonality = parseInt(this.value, 10);
	    that.save_values();
	});
	document.getElementById("num_notes-select").addEventListener("keyup", function(event) {
	    var new_num_notes = parseInt(this.value, 10);
	    if (isNaN(new_num_notes)) { return; }
	    if (new_num_notes > 0 && new_num_notes <= MAX_NUM_NOTES) {
		that.num_notes = new_num_notes;
		that.save_values();
	    }
	});
    }
};
