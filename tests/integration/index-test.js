import startApp from '../helpers/start-app';
import {module, test} from 'qunit';
import pretenderServer from '../helpers/pretender-server';
import Ember from 'ember';

var App = null;
var server = null;

module('Integration - Todo Index', {
  beforeEach: function() {
    App = startApp();
    server = pretenderServer();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('Should showo todos', function(assert) {
  visit("/todos/remote").then(function() {
    assert.equal(find(".todo").length, 10);
  });
});
