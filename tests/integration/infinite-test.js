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

var runTests = function(todosTest) {
  todosTest("smoke", function() {
    hasTodos(10);
  });

  todosTest("next page", function() {
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
};

module('Integration - Infinite Pagination Local', {
  beforeEach: function() {
    App = startApp();
    server = pretenderServer();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

runTests(todosTestLocal);

module('Integration - Infinite Pagination Remote', {
  beforeEach: function() {
    App = startApp();
    server = pretenderServer();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});
runTests(todosTestRemote);

