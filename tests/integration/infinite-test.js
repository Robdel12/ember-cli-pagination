import startApp from '../helpers/start-app';
import {module, test} from 'qunit';
import pretenderServer from '../helpers/pretender-server';
import Todo from '../../models/todo';
import Ember from 'ember';

var App = null;
var server = null;



var todosTestLocal = function(name, f) {
  test(name, function(assert) {
    visit("/todos/infinite").then(f);
  });
};

var todosTestRemote = function(name, f) {
  test(name, function(assert) {
    visit("/todos/infinite-remote").then(f);
  });
};

module('Integration - Infinite Pagination Local', {
  beforeEach: function() {
    App = startApp();
    server = pretenderServer();
    visit("/todos/infinite-remote");
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test("smoke", function(assert) {
  hasTodos(10);
});

test("next page", function(assert) {
  hasTodos(10);

  click(".infinite .next a");
  andThen(function() {
    QUnit.stop();
    setTimeout(function() {
      assert.equal(find('.infinite .todo').length,20);
      QUnit.start();
    },50);
  });
});

module('Integration - Infinite Pagination Remote', {
  beforeEach: function() {
    App = startApp();
    server = pretenderServer();
    visit("/todos/infinite");
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test("smoke", function(assert) {
  hasTodos(10);
});

test("next page", function(assert) {
  hasTodos(10);

  click(".infinite .next a");
  andThen(function() {
    QUnit.stop();
    setTimeout(function() {
      assert.equal(find('.infinite .todo').length,20);
      QUnit.start();
    },50);
  });
});

