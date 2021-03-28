import chalk from "chalk";
import fs from "fs";
import path from "path";

import {
  copyFile,
  createFile,
  isAccessible,
  getFilename,
  getSourcePath,
  errorHandler
} from "./utility";
import launcher from "./launcher";

export async function createreducer(options = {}) {
  try {
    options = {
      ...options,
    };

    const fileName = getFilename("reducer");
    let targetDirectory = path.resolve(process.cwd(), "./" + fileName);

    if (launcher.config.get("path")) {
      targetDirectory = path.resolve(
        process.cwd(),
        launcher.config.get("path"),
        "./" + fileName
      );
    }

    options.targetDirectory = targetDirectory;

    await createFile(targetDirectory);

    let template = path.resolve(__dirname, getSourcePath("reducer"));
    if (launcher.config.get("template")) {
        template = path.resolve(launcher.config.get("template"));
      }
    options.templateDirectory = template;

    await isAccessible(template);
    await copyFile(options);

    console.log("%s Project ready", chalk.green.bold("DONE"));
    return true;
  } catch (error) {
    errorHandler(error);
  }
}

exports.cli = createreducer;
exports.api = createreducer;

// import chalk from 'chalk';
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
