var AlchemyPreferences = function AlchemyPreferences() {
    this.available_notes = {};
    this.available_notes[MAJOR] = MAJOR_DIATONIC_NOTES;
    this.available_notes[MINOR] = MINOR_DIATONIC_NOTES;
    var that = this;
    
    var db;
    var db_transaction;
    var preferences_store;
    var DB_MAJOR_NOTES_INDEX = "major_available_notes";
    var DB_MINOR_NOTES_INDEX = "minor_available_notes";
    
    (function open_database() {
	console.log("Opening database for preferences...");
	var db_request = window.indexedDB.open(ALCHEMY_DATABASE, DATABASE_VERSION);
	db_request.onerror = function() {
	    console.log("Couldn't open " + ALCHEMY_DATABASE + " continuing without it");
	    db = false;
	};
	db_request.onupgradeneeded = function(event) {
	    db = event.target.result;
	    preferences_store = db.createObjectStore(ALCHEMY_PREFERENCES_STORE, {keyPath: "key"});
	};
	db_request.onsuccess = function(event) {
	    db = event.target.result;
	    db_transaction = db.transaction(ALCHEMY_PREFERENCES_STORE, "readwrite");
	    preferences_store = db_transaction.objectStore(ALCHEMY_PREFERENCES_STORE);
	    that.save_values();
	    that.load_values();
	};
    })();
    
    this.load_values = function() {
	if (!preferences_store) { return; }
	
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
	// Don't know yet if this should be public
	if (!preferences_store) { return; }
	
	preferences_store.put({key: DB_MAJOR_NOTES_INDEX, value: that.available_notes[MAJOR]});
	preferences_store.put({key: DB_MINOR_NOTES_INDEX, value: that.available_notes[MINOR]});
    };
};
