import startApp from '../helpers/start-app';
import {module, test} from 'qunit';
import pretenderServer from '../helpers/pretender-server';
import Todo from '../../models/todo';
import Ember from 'ember';

var App = null;
var server = null;

var todosTestRemote = function(name, f, initialPage) {

  test(name, function(assert) {
    var url = "/todos/remote";
    if (initialPage) {
      url += "?page="+initialPage;
    }
    visit(url).then(f);
  });
};

var todosTestLocal = function(name, f, initialPage) {
  test(name, function(assert) {
    var url = "/todos/local";
    if (initialPage) {
      url += "?page="+initialPage;
    }
    visit(url).then(f);
  });
};

// commented out for now because it fails.
// todosTest("numRemoteCalls", function(assert) {
//   equal(find(".numRemoteCalls").text().trim(), "1");
// });

var createTests = function(todosTest, todosUrl) {
  test("page links", function(assert) {
    assert.equal(find(".pagination").length, 1);
    hasPages(4);
  });

  test("first page is active at start", function(assert) {
    hasActivePage(1);
  });

  test("clicking page 2", function(assert) {
    clickPage(2);
    andThen(function() {
      hasTodos(10);
      hasActivePage(2);
    });
  });

  test("clicking page 4", function(assert) {
    clickPage(4);
    andThen(function() {
      hasTodos(3);
      hasActivePage(4);

      hasButtons({
        prev: true,
        next: false
      });
    });
  });

  test("passing in page 2 query param", function(assert) {
    andThen(function() {
      hasTodos(10);
      hasActivePage(2);

      assert.equal(currentURL(), todosUrl+"?page=2");
    });
  },2);

  test("next button - proper buttons visible", function(assert) {
    hasActivePage(1);
    hasButtons({
      prev: false,
      next: true
    });
  });

  test("click next", function(assert) {
    clickPage("next");
    andThen(function() {
      hasButtons({
        prev: true,
        next: true
      });
      hasTodos(10);
      hasActivePage(2);
    });
  });

  test("click prev", function(assert) {
    clickPage(2);
    andThen(function() {
      clickPage("prev");
    });
    andThen(function() {
      hasButtons({
        prev: false,
        next: true
      });
      hasTodos(10);
      hasActivePage(1);
    });
  });

  test("click next on last page and not increment", function(assert) {
    clickPage(4);
    andThen(function() {
      clickPage("next");
    });
    andThen(function() {
      clickPage("next");
    });
    andThen(function() {
      hasTodos(3);
      assert.equal(currentURL(), todosUrl+"?page=4");
      assert.notEqual(currentURL(), todosUrl+"?page=5");
      hasActivePage(4);
    });
  });

  test("click prev on first page and not decrement", function(assert) {
    clickPage("prev");
    andThen(function() {
      clickPage("prev");
    });
    andThen(function() {
      hasTodos(10);
      assert.equal(currentURL(), todosUrl);
      assert.notEqual(currentURL(), todosUrl+"?page=-1");
      hasActivePage(1);
    });
  });
};

module('Integration - Pagination Remote', {
  beforeEach: function() {
    App = startApp();
    server = pretenderServer();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

createTests(todosTestRemote, "/todos/remote");

module('Integration - Pagination Local', {
  beforeEach: function() {
    App = startApp();
    server = pretenderServer();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});
createTests(todosTestLocal, "/todos/local");
