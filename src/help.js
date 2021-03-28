import { getGeneralHelpMessage } from './utility';

function help() {
    console.log(getGeneralHelpMessage())
}

exports.cli = help;
exports.api = help;

