"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilename = getFilename;
exports.getSourcePath = getSourcePath;
exports.copyFile = copyFile;
exports.copyTemplateFiles = copyTemplateFiles;
exports.createFile = createFile;
exports.isAccessible = isAccessible;
exports.errorHandler = errorHandler;
exports.getGeneralHelpMessage = getGeneralHelpMessage;

var _ncp = _interopRequireDefault(require("ncp"));

var _chalk = _interopRequireDefault(require("chalk"));

var _fs = _interopRequireDefault(require("fs"));

var _util = require("util");

var _npmlog = _interopRequireDefault(require("npmlog"));

var _launcher = _interopRequireDefault(require("../launcher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pkg = require("../../package.json");

const copy = (0, _util.promisify)(_ncp.default);
const copyFilefs = (0, _util.promisify)(_fs.default.copyFile);
const writeFile = (0, _util.promisify)(_fs.default.writeFile);
const access = (0, _util.promisify)(_fs.default.access);

function getFilename(type) {
  let file = type; // check argument gievn

  if (_launcher.default.config.get("name")) {
    file = _launcher.default.config.get("name");
  } // check extension


  const splittedFilename = file.split(".");

  if (splittedFilename[splittedFilename.length - 1] !== "js") {
    file = `${file}.js`;
  }

  return file;
}

function getSourcePath(type) {
  let source = "";

  switch (type) {
    case "actions":
      source = "../template/redux/actions/actions.js";
      break;

    case "saga":
      source = "../template/redux/sagas/sampleSaga.js";
      break;

    case "reducer":
      source = "../template/redux/reducers/sampleReducer.js";
      break;
  }

  return source;
}

function copyFile(options) {
  return copyFilefs(options.templateDirectory, options.targetDirectory);
}

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false
  });
}

async function createFile(targetURL) {
  try {
    console.log("Creating file at", _chalk.default.green(targetURL));
    await writeFile(targetURL, " ");
  } catch (err) {
    err.type = "CUSTOM";
    err.message = "File create error";
    errorHandler(err);
  }
}

async function isAccessible(target) {
  try {
    await access(target, _fs.default.constants.R_OK);
  } catch (err) {
    err.type = "CUSTOM";
    err.message = "Target is not accessible";
    errorHandler(err);
  }
}

function errorHandler(err) {
  if (!err) {
    process.exit(1);
  }

  if (err.type === "CUSTOM") {
    err.message && _npmlog.default.error(err.message);
    process.exit(1);
  }

  err.message && _npmlog.default.error(err.message);

  if (err.stack) {
    _npmlog.default.error("", err.stack);

    _npmlog.default.error("", "");

    _npmlog.default.error("", "");

    _npmlog.default.error("", pkg.name, pkg.version, "node:", process.version);

    _npmlog.default.error("", "please open an issue including this log on " + pkg.bugs.url);
  }

  process.exit(1);
}

function getGeneralHelpMessage() {
  const commands = Object.keys(_launcher.default.cli).join(", ");
  const message = `Usage: ${pkg.name} <command>
  
  The available commands for ${pkg.name} are:
  
  ${commands}

  -----------------------------------------
  
  
  ${pkg.name} v${_launcher.default.version} on Node.js ${process.version}`;
  return message;
}