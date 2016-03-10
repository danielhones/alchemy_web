var AlchemyPreferences = function AlchemyPreferences() {
    this.available_notes = {};
    this.available_notes[MAJOR] = MAJOR_DIATONIC_NOTES;
    this.available_notes[MINOR] = MINOR_DIATONIC_NOTES;
    var that = this;
    
    var db;
    var DB_MAJOR_NOTES_INDEX = "major_available_notes";
    var DB_MINOR_NOTES_INDEX = "minor_available_notes";
    
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
	
    }
};
