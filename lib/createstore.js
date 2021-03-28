"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createstore = createstore;

var _chalk = _interopRequireDefault(require("chalk"));

var _path = _interopRequireDefault(require("path"));

var _launcher = _interopRequireDefault(require("./launcher"));

var _utility = require("./utility");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createstore(options = {}) {
  options = { ...options
  };

  let targetDirectory = _path.default.resolve(process.cwd(), './redux');

  if (_launcher.default.config.get("path")) {
    targetDirectory = _path.default.resolve(process.cwd(), _launcher.default.config.get("path"));
  }

  await (0, _utility.isAccessible)(targetDirectory);
  options.targetDirectory = targetDirectory;

  const templateDir = _path.default.resolve(__dirname, '../template', 'redux');

  options.templateDirectory = templateDir;
  await (0, _utility.isAccessible)(templateDir);
  await (0, _utility.copyTemplateFiles)(options);
  console.log('%s Project ready', _chalk.default.green.bold('DONE'));
  return true;
}

exports.cli = createstore;
exports.api = createstore;