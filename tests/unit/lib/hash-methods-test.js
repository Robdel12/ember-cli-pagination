import Util from 'ember-cli-pagination/util';
import {module, test} from 'qunit';
import toArray from '../../helpers/to-array';
import equalArray from '../../helpers/equal-array';

module("Hash Methods");

test("hash property explore", function(assert) {
  var params = {page: 1, name: "Adam"};
  var keys = Util.keysOtherThan(params,["page","perPage"]);
  equalArray(keys,["name"]);

  var other = Util.paramsOtherThan(params,["page","perPage"]);
  assert.deepEqual(other,{name: "Adam"});
});