"use strict";

var _execa = _interopRequireDefault(require("execa"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function installDepedencies(options) {
  const result = await (0, _execa.default)('npm', ['install  redux redux-devtools-extension redux-saga react-redux'], {
    cwd: _path.default.resolve(process.cwd())
  });

  if (result.failed) {
    return Promise.reject(new Error('Failed to install dependencies'));
  }

  return;
}

exports.cli = installDepedencies;
exports.api = installDepedencies;