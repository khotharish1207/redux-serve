#!/usr/bin/env node
const log = require('npmlog')
const launcher = require('../lib/launcher');
const utils = require('../lib/utility')
const nopt = require('nopt');


const knownOpts = {
    "path": [String, '.'],
    "name": [String, 'index'],
    "template": [String, '']
}
const shortHands = {
    "path": ["--path"],
    "p": ["--path"],
    "name": ["--name"],
    "n": ["--name"],
    "t": ["--template"],
    "template": ["--template"]
}

const parsed = nopt(knownOpts, shortHands, process.argv, 2);
const cmd = parsed.argv.remain.shift();

launcher.load(parsed)
    .then(() => {
        if (!launcher.cli[cmd]) {
            log.error(cmd, "is not valid command.")
            console.log(utils.getGeneralHelpMessage())
            process.exit(1);
        }

        launcher.cli[cmd]
            .apply(null, parsed.argv.remain)
            // .catch(utils.errorHandler)

    }).catch(utils.errorHandler);
