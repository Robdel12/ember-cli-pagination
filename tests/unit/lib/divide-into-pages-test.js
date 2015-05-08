import Ember from 'ember';
import { test } from 'ember-qunit';
import DivideIntoPages from 'ember-cli-pagination/divide-into-pages';

module("DivideIntoPages");

var subject = function() {
  var subject = null;
  var ops = {perPage: 2, all: [1,2,3,4,5]};

  Ember.run(function() {
    subject = DivideIntoPages.create(ops);
  });

};

test("smoke", function(assert) {
  assert.equal(subject.totalPages(),3);
  assert.deepEqual(subject.objsForPage(2),[3,4]);
});

test("page out of range returns empty array", function(assert) {
  assert.deepEqual(subject.objsForPage(25),[]);
});
