'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _getHashDigest = require('loader-utils/lib/getHashDigest');

var _getHashDigest2 = _interopRequireDefault(_getHashDigest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_ref) {
  var filename = _ref.filename;

  this.apply = function (compiler) {
    compiler.plugin('emit', function (compilation, next) {
      var hmrCssEntries = compilation.hmrCssEntries || {};
      (0, _keys2.default)(hmrCssEntries).forEach(function (entry) {
        var content = (0, _keys2.default)(hmrCssEntries[entry]).sort(function (a, b) {
          return a.position - b.position;
        }).map(function (resourcePath) {
          return hmrCssEntries[entry][resourcePath].style;
        }).join('');
        var hash = (0, _getHashDigest2.default)(content, 'md5', 'base64', 10);
        filename = filename.replace(/\[name\]/, entry).replace(/\[hash\]/, hash);
        compilation.assets[filename] = {
          source: function source() {
            return content;
          },
          size: function size() {
            return content.length;
          }
        };
        compilation.chunks.filter(function (_ref2) {
          var name = _ref2.name;
          return name === entry;
        })[0].files.push(filename);
      });
      next();
    });
    compiler.plugin('after-emit', function (compilation, next) {
      // also unlink old files
      (0, _keys2.default)(compilation.assets).forEach(function (key) {
        _fs2.default.writeFileSync(compiler.outputPath + '/' + key, compilation.assets[key].source());
      });
      next();
    });
  };
};