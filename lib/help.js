"use strict";

var _utility = require("./utility");

function help() {
  console.log((0, _utility.getGeneralHelpMessage)());
}

exports.cli = help;
exports.api = help;