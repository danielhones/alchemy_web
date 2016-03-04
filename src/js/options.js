var AlchemyOptions = function AlchemyOptions() {
    var that = this;
    
    this.load_values() = function() {
	// TODO: if cookie exists, load values from cookie
	// else set_default_values()
	set_default_values();
    };

    function set_default_values() {
	that.num_notes = 1;
	that.tonality = MAJOR;
    }
};
