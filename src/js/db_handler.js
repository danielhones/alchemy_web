var ALCHEMY_DATABASE = "AlchemyDatabase";
var ALCHEMY_OPTIONS_STORE = "AlchemyOptions";
var ALCHEMY_PREFERENCES_STORE = "AlchemyPreferences";
var DATABASE_VERSION = 6;


DbHandler = {
    initalized: false,
    onready_callbacks: [],

    init: function() {
        var db;
        if (this.initialized) {
            info("DbHandler already initialized");
            return;
        }
	info("Opening database in DbHandler");
	var db_request = window.indexedDB.open(ALCHEMY_DATABASE, DATABASE_VERSION);
        var that = this;
        
	db_request.onerror = function() {
	    warn("DbHandler couldn't open " + ALCHEMY_DATABASE + ", continuing without it");
	    that.db = false;
	};
	db_request.onupgradeneeded = function(event) {
            debug("DbHandler running onupgradeneeded callback");
            create_stores();
	    that.db = event.target.result;
            that.initialized = true;
            that.run_onready_callbacks();
	};
	db_request.onsuccess = function(event) {
            debug("Running onsuccess callback");
	    that.db = event.target.result;
            that.initialized = true;
            that.run_onready_callbacks();            
	};
    },

    create_stores: function() {
        try { this.db.createObjectStore(ALCHEMY_PREFERENCES_STORE, {keyPath: "key"}); } catch (e) { }
        try { this.db.createObjectStore(ALCHEMY_OPTIONS_STORE, {keyPath: "key"}); } catch (e) { }
    },

    get: function(store, key, callback) {
        if (!this.db) { return; }
        debug("DbHandler.get called with:", store, key);
	var transaction = this.db.transaction(store, "readwrite");
	var tx_store = transaction.objectStore(store);
        tx_store.get(key).onsuccess = callback;
    },

    put: function(store, k, v) {
        if (!this.db) { return; }
        debug("DbHandler.put called with:", store, k, v);
	var transaction = this.db.transaction(store, "readwrite");
	var tx_store = transaction.objectStore(store);
        tx_store.put({key: k, value: v});
    },

    run_onready_callbacks: function() {
        if (!this.initialized) { return; }
        var num_callbacks = this.onready_callbacks.length;
        for (var i = 0; i < num_callbacks; i++) {
            var f = this.onready_callbacks.shift();
            f(this);
        }
    },

    add_onready_listener: function(callback) {
        if (this.initialized) {
            callback(this);
        } else {
            this.onready_callbacks.push(callback);
        }
        return this;
    }
};

DbHandler.init();

DbHandler.preferences = {
    get: function(key, callback) {
        DbHandler.get(ALCHEMY_PREFERENCES_STORE, key, callback);
    },
    put: function(key, value) {
        DbHandler.put(ALCHEMY_PREFERENCES_STORE, key, value);
    }
};

DbHandler.options = {
    get: function(key, callback) {
        DbHandler.get(ALCHEMY_OPTIONS_STORE, key, callback);
    },
    put: function(key, value) {
        DbHandler.put(ALCHEMY_OPTIONS_STORE, key, value);
    }
};
