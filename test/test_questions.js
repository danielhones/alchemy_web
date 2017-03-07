var utils = require('../src/js/utilities.js');
debug = utils.debug;
info = utils.info;
warn = utils.warn;
sort_number = utils.sort_number;

var constants = require('../src/js/constants.js');
MAJOR = constants.MAJOR;
MINOR = constants.MINOR;

var MockAudio = require('./mock/mock_audio.js').MockAudio;
Audio = MockAudio;


var assert = require('assert');
//var jsdom = require('jsdom');
var AlchemyQuestion = require('../src/js/question').AlchemyQuestion;


var ALL_NOTES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];


describe('AlchemyQuestion', function() {
    describe('initial state', function() {
        it('tonality is major', function() {
            var question = new AlchemyQuestion();
            assert.equal(question.tonality, constants.MAJOR);
        });

        it('current_notes is empty' , function() {
            var question = new AlchemyQuestion();
            assert.equal(question.current_notes.length, 0);
        });
    });

    describe('select_new_notes', function() {
        it('current_notes.length equals first argument', function() {
            var question = new AlchemyQuestion();
            question.select_new_notes(1, ALL_NOTES);
            assert.equal(question.current_notes.length, 1);
            question.select_new_notes(5, ALL_NOTES);
            assert.equal(question.current_notes.length, 5);
        });

        it('only selects notes from allowed_notes argument', function() {
            var question = new AlchemyQuestion();
            var allowed_notes = [7, 8, 9];
            question.select_new_notes(3, allowed_notes);
            question.current_notes.forEach(function(o, _) {
                assert.notEqual(allowed_notes.indexOf(o), -1);
            });
        });
    });
});
