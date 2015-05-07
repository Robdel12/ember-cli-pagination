import startApp from '../helpers/start-app';
import {module, test} from 'qunit';
import pretenderServer from '../helpers/pretender-server';
import Todo from '../../models/todo';
import Ember from 'ember';

var App = null;
var server = null;

module('Integration - Pagination Remote Sorted', {
  beforeEach: function() {
    App = startApp();
    server = pretenderServer();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

var todosTest = function(name, f, sortByField) {
  test(name, function(assert) {
    var url = "/todos/remote-sorted";
    if (sortByField) {
      url += "?sortByField="+sortByField;
    }
    visit(url).then(f);
  });
};

todosTest("smoke", function() {
  assert.equal(find(".pagination").length, 1);
  hasPages(4);
  hasTodo(0,"Clean Gutters 0");
  hasTodo(1,"Make Dinner 0");
});

todosTest("smoke sorted", function() {
  assert.equal(find(".pagination").length, 1);
  hasPages(4);

  hasTodo(0,"Clean Gutters 0");
  hasTodo(1,"Clean Gutters 1");

  assert.equal(find("#sortByField input").val(),"name");
},"name");

todosTest("change to sorted", function() {
  assert.equal(find(".pagination").length, 1);
  hasPages(4);
  hasTodo(0,"Clean Gutters 0");
  hasTodo(1,"Make Dinner 0");

  Ember.run(function() {
    fillIn("#sortByField input","name");
  });
  andThen(function() {
    hasTodo(1,"Clean Gutters 1");
  });
});