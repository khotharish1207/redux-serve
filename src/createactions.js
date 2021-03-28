import chalk from "chalk";
import path from "path";
import {
  copyFile,
  createFile,
  isAccessible,
  getFilename,
  getSourcePath,
  errorHandler,
} from "./utility";
import launcher from "./launcher";

export async function createactions(options = {}) {
  try {
    options = {
      ...options,
    };

    const fileName = getFilename("actions");
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

    let template = path.resolve(__dirname, getSourcePath("actions"));
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

exports.cli = createactions;
exports.api = createactions;
