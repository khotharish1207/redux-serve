import ncp from "ncp";
import chalk from "chalk";
import fs from "fs";
import { promisify } from "util";
import log from "npmlog";
import launcher from "../launcher";

const pkg = require("../../package.json");
const copy = promisify(ncp);
const copyFilefs = promisify(fs.copyFile);
const writeFile = promisify(fs.writeFile);
const access = promisify(fs.access);

export function getFilename(type) {
  let file = type;
  // check argument gievn
  if (launcher.config.get("name")) {
    file = launcher.config.get("name");
  }

  // check extension
  const splittedFilename = file.split(".");
  if (splittedFilename[splittedFilename.length - 1] !== "js") {
    file = `${file}.js`;
  }

  return file;
}

export function getSourcePath(type) {
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

export function copyFile(options) {
  return copyFilefs(options.templateDirectory, options.targetDirectory);
}
export async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

export async function createFile(targetURL) {
  try {
    console.log("Creating file at", chalk.green(targetURL));
    await writeFile(targetURL, " ");
  } catch (err) {
    err.type = "CUSTOM";
    err.message = "File create error";
    errorHandler(err);
  }
}

export async function isAccessible(target) {
  try {
    await access(target, fs.constants.R_OK);
  } catch (err) {
    err.type = "CUSTOM";
    err.message = "Target is not accessible";
    errorHandler(err);
  }
}

export function errorHandler(err) {
  if (!err) {
    process.exit(1);
  }

  if (err.type === "CUSTOM") {
    err.message && log.error(err.message);
    process.exit(1);
  }

  err.message && log.error(err.message);

  if (err.stack) {
    log.error("", err.stack);
    log.error("", "");
    log.error("", "");
    log.error("", pkg.name, pkg.version, "node:", process.version);
    log.error("", "please open an issue including this log on " + pkg.bugs.url);
  }
  process.exit(1);
}

export function getGeneralHelpMessage() {
  const commands = Object.keys(launcher.cli).join(", ");

  const message = `Usage: ${pkg.name} <command>
  
  The available commands for ${pkg.name} are:
  
  ${commands}

  -----------------------------------------
  
  
  ${pkg.name} v${launcher.version} on Node.js ${process.version}`;

  return message;
}
