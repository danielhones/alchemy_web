var AlchemyOptions = function AlchemyOptions() {
    this.tonality = MAJOR;
    this.num_notes = 2;
    var that = this;

    var db;
    var db_transaction;
    var options_store;

    (function open_database() {
	console.log("Opening database for options...");
	var db_request = window.indexedDB.open(ALCHEMY_DATABASE, DATABASE_VERSION);
	db_request.onerror = function() {
	    console.log("Couldn't open " + ALCHEMY_DATABASE + " continuing without it");
	    db = false;
	};
	db_request.onupgradeneeded = function(event) {
	    db = event.target.result;
	    options_store = db.createObjectStore(ALCHEMY_OPTIONS_STORE, {keyPath: "key"});
	};
	db_request.onsuccess = function(event) {
	    db = event.target.result;
	    db_transaction = db.transaction(ALCHEMY_OPTIONS_STORE, "readwrite");
	    options_store = db_transaction.objectStore(ALCHEMY_OPTIONS_STORE);
	    that.load_values();
	};
    })();
    
    this.load_values = function() {
	if (!options_store) { return; }
	
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
	if (!options_store) { return; }
	
	options_store.put({key: "tonality", value: that.tonality});
	options_store.put({key: "num_notes", value: that.num_notes});
    };

    // TODO: Register functions for options button and modal
};
