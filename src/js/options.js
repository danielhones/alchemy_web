var AlchemyOptions = function AlchemyOptions() {
    this.tonality = MAJOR;
    this.num_notes = 1;
    var that = this;

    this.load_values = function() {
	DbHandler.options.get("tonality", function(event) {
            if (event.target.result) {
	        set_tonality(event.target.result.value);
	        debug("Loaded tonality from db: ", that.tonality);
            } else {
                DbHandler.options.put("tonality", that.tonality);
                debug("Set default tonality");
            }
	});
	DbHandler.options.get("num_notes", function(event) {
            if (event.target.result) {
	        set_num_notes(event.target.result.value);
	        debug("Loaded num_notes from db: ", that.num_notes);
            } else {
                DbHandler.options.put("num_notes", that.num_notes);
                debug("Set default num_notes");
            }
	});
    };

    (function initialize() {
        DbHandler.add_onready_listener(that.load_values);
	register_modal_functions();
	document.getElementById("num_notes-select").setAttribute("max", MAX_NUM_NOTES);
    })();
    
    this.save_values = function() {
	DbHandler.options.put("tonality", that.tonality);
	DbHandler.options.put("num_notes", that.num_notes);
	update_view();
    };

    this.show_modal = function() {
	show_modal("options-view");
    };

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
