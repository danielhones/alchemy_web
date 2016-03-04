var AlchemyOptions = function AlchemyOptions() {
    var that = this;

    function set_default_values() {
	that.num_notes = 1;
	that.tonality = MAJOR;
    }

    (function load_values() {
	// TODO: if cookie exists, load values from cookie
	// else set_default_values()
	set_default_values();
    })();
};
