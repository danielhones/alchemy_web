var constants = require('../../src/js/constants.js');

var MockAudio = function Audio() {
    this.current_time = 0;
    this.play = function() {},
    this.pause = function() {}
};


var mock_notes = [];
for (var i = 0; i < 12; i++) {
    mock_notes.push(new MockAudio(''));
}


var mock_cadences = {};
mock_cadences[constants.MAJOR] = new MockAudio('');
mock_cadences[constants.MINOR] = new MockAudio('');


exports.MockAudio = MockAudio;
exports.mock_notes = mock_notes;
exports.mock_cadences = mock_cadences;
