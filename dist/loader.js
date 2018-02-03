'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hmrCssEntries = {};

var findEntry = function findEntry(mod) {
  if (mod.reasons.length > 0 && mod.reasons[0].module.resource) {
    return findEntry(mod.reasons[0].module);
  }
  return _path2.default.dirname(_fs2.default.realpathSync(mod.resource)).split('/').pop();
};

module.exports = function (style) {
  var entry = findEntry(this._module);
  hmrCssEntries[entry] = hmrCssEntries[entry] || {};
  hmrCssEntries[entry][this.resourcePath] = hmrCssEntries[entry][this.resourcePath] || {
    position: (0, _keys2.default)(hmrCssEntries[entry]).length
  };
  hmrCssEntries[entry][this.resourcePath].style = style;
  this._compilation.hmrCssEntries = hmrCssEntries;
  return style;
};