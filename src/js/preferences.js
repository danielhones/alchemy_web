var AlchemyPreferences = function AlchemyPreferences() {
    this.available_notes = {};
    this.available_notes[MAJOR] = MAJOR_DIATONIC_NOTES;
    this.available_notes[MINOR] = MINOR_DIATONIC_NOTES;
    var that = this;
    
    var db;
    var db_transaction;
    var preferences_store;
    
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
	    that.load_values();
	};
    })();
    
    this.load_values = function() {
	
    };
    
    function save_values() {
	// Don't know yet if this should be public
    };
};
