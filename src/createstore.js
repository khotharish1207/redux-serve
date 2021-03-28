
import chalk from 'chalk';
import path from 'path';
import launcher from './launcher'

import { copyTemplateFiles, isAccessible } from './utility'

export async function createstore(options = {}) {
    options = {
        ...options,
    };

    let targetDirectory = path.resolve(process.cwd())

    if (launcher.config.get("path")) {
      targetDirectory = path.resolve(
        process.cwd(),
        launcher.config.get("path")
      );
    }

    await isAccessible(targetDirectory)
    options.targetDirectory = targetDirectory;

    const templateDir = path.resolve(__dirname, '../template');
    options.templateDirectory = templateDir;

    await isAccessible(templateDir)
    await copyTemplateFiles(options);

    console.log('%s Project ready', chalk.green.bold('DONE'));
    return true;
}


exports.cli = createstore
exports.api = createstore