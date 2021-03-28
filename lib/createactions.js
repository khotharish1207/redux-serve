"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createactions = createactions;

var _chalk = _interopRequireDefault(require("chalk"));

var _path = _interopRequireDefault(require("path"));

var _utility = require("./utility");

var _launcher = _interopRequireDefault(require("./launcher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createactions(options = {}) {
  try {
    options = { ...options
    };
    const fileName = (0, _utility.getFilename)("actions");

    let targetDirectory = _path.default.resolve(process.cwd(), "./" + fileName);

    if (_launcher.default.config.get("path")) {
      targetDirectory = _path.default.resolve(process.cwd(), _launcher.default.config.get("path"), "./" + fileName);
    }

    options.targetDirectory = targetDirectory;
    await (0, _utility.createFile)(targetDirectory);

    let template = _path.default.resolve(__dirname, (0, _utility.getSourcePath)("actions"));

    if (_launcher.default.config.get("template")) {
      template = _path.default.resolve(_launcher.default.config.get("template"));
    }

    options.templateDirectory = template;
    await (0, _utility.isAccessible)(template);
    await (0, _utility.copyFile)(options);
    console.log("%s Project ready", _chalk.default.green.bold("DONE"));
    return true;
  } catch (error) {
    (0, _utility.errorHandler)(error);
  }
}

exports.cli = createactions;
exports.api = createactions;