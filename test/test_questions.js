var assert = require('assert');
var fs = require('fs');
var jsdom = require('jsdom-global');

var cleanup = jsdom(
    fs.readFileSync('build/index.html', {encoding: 'utf-8'})
);

var utils = require('../src/js/utilities.js');
debug = function(){}; //utils.debug;
info = function(){}; //utils.info;
warn = function(){}; //utils.warn;
sort_number = utils.sort_number;
array_difference = utils.array_difference;

var constants = require('../src/js/constants.js');
MAJOR = constants.MAJOR;
MINOR = constants.MINOR;

var mock_audio = require('./mock/mock_audio.js');
var MockAudio = mock_audio.MockAudio;
var mock_notes = mock_audio.mock_notes;
var mock_cadences = mock_audio.mock_cadences;



var AlchemyQuestion = require('../src/js/question').AlchemyQuestion;


describe('AlchemyQuestion', function() {

    var ALL_NOTES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    after(cleanup);

    describe('initial state', function() {
        it('tonality is major', function() {
            var question = new AlchemyQuestion(mock_notes, mock_cadences);
            assert.equal(question.tonality, constants.MAJOR);
        });

        it('current_notes is empty' , function() {
            var question = new AlchemyQuestion(mock_notes, mock_cadences);
            assert.equal(question.current_notes.length, 0);
        });
    });

    describe('select_new_notes', function() {
        it('current_notes.length equals first argument', function() {
            var question = new AlchemyQuestion(mock_notes, mock_cadences);
            question.select_new_notes(1, ALL_NOTES);
            assert.equal(question.current_notes.length, 1);
            question.select_new_notes(5, ALL_NOTES);
            assert.equal(question.current_notes.length, 5);
        });

        it('only selects notes from allowed_notes argument', function() {
            var question = new AlchemyQuestion(mock_notes, mock_cadences);
            var allowed_notes = [7, 8, 9];
            question.select_new_notes(3, allowed_notes);
            question.current_notes.forEach(function(o, _) {
                assert.notEqual(allowed_notes.indexOf(o), -1);
            });
        });
    });

    describe('check_answer', function() {
        context('with right answer', function() {
            it('it returns empty list', function() {
                var question = new AlchemyQuestion(mock_notes, mock_cadences);
                for (var i = 1; i < ALL_NOTES.length; i++) {
                    question.select_new_notes(i, ALL_NOTES);
                    var result = question.check_answer(question.get_answer());
                    assert.equal(0, result.length);
                }
            });
        });

        context('with wrong number of notes', function() {
            describe('returns false', function() {
                it('for all right notes but fewer than actual number', function() {
                    var question = new AlchemyQuestion(mock_notes, mock_cadences);
                    for (var i = 2; i < ALL_NOTES.length; i++) {
                        question.select_new_notes(i, ALL_NOTES);
                        var right_answer = question.get_answer();
                        var result = question.check_answer(right_answer.pop());
                        assert.equal(false, result);
                    }
                });

                it('for all right notes and extra notes', function() {
                    var question = new AlchemyQuestion(mock_notes, mock_cadences);
                    for (var i = 2; i < ALL_NOTES.length; i++) {
                        question.select_new_notes(i, ALL_NOTES);
                        var right_answer = question.get_answer();
                        var result = question.check_answer(right_answer.push(11));
                        assert.equal(false, result);
                    }
                });


                it('for all wrong notes and fewer than the right number', function() {
                    var question = new AlchemyQuestion(mock_notes, mock_cadences);
                    for (var i = 2; i < ALL_NOTES.length; i++) {
                        question.select_new_notes(i, ALL_NOTES);
                        var right_answer = question.get_answer();
                        var test_answer = array_difference(ALL_NOTES, right_answer);
                        test_answer = test_answer.slice(0, right_answer.length - 2);
                        var result = question.check_answer(test_answer);
                        assert.equal(false, result);
                    }
                });

                it('for all wrong notes and more than the right number', function() {
                    var question = new AlchemyQuestion(mock_notes, mock_cadences);
                    for (var i = 2; i < Math.floor(ALL_NOTES.length / 2 - 1); i++) {
                        question.select_new_notes(i, ALL_NOTES);
                        var right_answer = question.get_answer();
                        var test_answer = array_difference(ALL_NOTES, right_answer);
                        var result = question.check_answer(test_answer);
                        assert.equal(false, result);
                    }
                });
            });
        });

        context('right number of notes', function() {
            context('returns array of wrong notes', function() {
                it('some right notes, some wrong', function() {
                    var question = new AlchemyQuestion(mock_notes, mock_cadences);
                    var num_notes = 3;
                    question.select_new_notes(num_notes, ALL_NOTES);
                    var right_answer = question.get_answer(); 
                    var test_answer = question.get_answer();
                    var diff = array_difference(ALL_NOTES, test_answer);
                    test_answer.pop();
                    test_answer.push(diff[0]);
                    test_answer.slice(0, num_notes - 2).forEach(function(o, i) {
                        assert.equal(o, right_answer[i]);
                    });
                });

                it('all wrong notes', function() {
                    var question = new AlchemyQuestion(mock_notes, mock_cadences);
                    for (var i = 2; i < Math.floor(ALL_NOTES.length / 2 - 1); i++) {
                        question.select_new_notes(i, ALL_NOTES);
                        var right_answer = question.get_answer();
                        var diff = array_difference(ALL_NOTES, right_answer);
                        var test_answer = diff.slice(0, i);
                        var result = question.check_answer(test_answer);
                        test_answer.forEach(function(o, i) {
                            assert.equal(o, result[i]);
                        });
                    }                
                });
            });
        });
    });

    describe('get_answer', function() {
        it('returns a copy of the note array', function() {
            var question = new AlchemyQuestion(mock_notes, mock_cadences);
            var num_notes = 5;
            question.select_new_notes(num_notes, ALL_NOTES);
            var test = question.get_answer();
            test.pop();  // make sure we can't mutate it
            assert.notEqual(test, question.get_answer());
            assert.equal(num_notes, question.get_answer().length);
        });
    });
});
