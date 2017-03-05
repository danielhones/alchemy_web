var utils = require('../src/js/utilities.js');
var constants = require('../src/js/constants.js');
/*
debug = utils.debug;
info = utils.info;
warn = utils.warn;
*/
var assert = require('assert');
//var jsdom = require('jsdom');
var MockAudio = require('./mock/mock_audio.js').MockAudio;
Audio = MockAudio;
var AlchemyQuestion = require('../src/js/question').AlchemyQuestion;


describe('AlchemyQuestion', function() {
    describe('initial state', function() {
        it('tonality is major', function() {
            var question = AlchemyQuestion();
            assert.equal(question.tonality, constants.MAJOR);
        });

        it('current_notes is empty' , function() {
            var question = AlchemyQuestion();
            assert.equal(question.current_notes.length, 0);
        });
    });

});
