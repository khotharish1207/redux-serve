"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createreducer = createreducer;

var _chalk = _interopRequireDefault(require("chalk"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _utility = require("./utility");

var _launcher = _interopRequireDefault(require("./launcher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createreducer(options = {}) {
  try {
    options = { ...options
    };
    const fileName = (0, _utility.getFilename)("reducer");

    let targetDirectory = _path.default.resolve(process.cwd(), "./" + fileName);

    if (_launcher.default.config.get("path")) {
      targetDirectory = _path.default.resolve(process.cwd(), _launcher.default.config.get("path"), "./" + fileName);
    }

    options.targetDirectory = targetDirectory;
    await (0, _utility.createFile)(targetDirectory);

    let template = _path.default.resolve(__dirname, (0, _utility.getSourcePath)("reducer"));

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

exports.cli = createreducer;
exports.api = createreducer; // import chalk from 'chalk';
// import wget from 'wget-improved'
// const src = "https://raw.githubusercontent.com/khotharish1207/react-redux-saga/master/src/redux/reducers/sampleReducer.js"
// const output = './sampleReducer.js';
// const options = {
//     // see options below
// };
// function createreducer() {
//     return new Promise((res, rej) => {
//         let download = wget.download(src, output, options);
//         download.on('error', function (err) {
//             rej(err);
//             console.error('%s error in creating saga', chalk.red.bold('ERROR'));
//         });
//         download.on('start', function (fileSize) {
//             console.log(fileSize);
//             console.log('%s creating saga', chalk.green.bold('Started'));
//         });
//         download.on('end', function (output) {
//             res(output);
//             console.log('%s created succesfully', chalk.green.bold('DONE'));
//         });
//         download.on('progress', function (progress) {
//             typeof progress === 'number'
//             console.log(progress)
//             console.log(chalk.green.bold('In Progress'));
//             // code to show progress bar
//         });
//     })
// }
// exports.cli = createreducer
// exports.api = createreducer