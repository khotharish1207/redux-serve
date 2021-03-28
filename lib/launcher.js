'use strict';

const fs = require('fs');

const pkg = require('../package.json');

const launcher = {
  loaded: false
};
launcher.version = pkg.version;
const api = {},
      cli = {};
Object.defineProperty(launcher, 'commands', {
  get: () => {
    if (launcher.loaded === false) {
      throw new Error('run launcher.load before');
    }

    return api;
  }
});
Object.defineProperty(launcher, 'cli', {
  get: () => {
    if (launcher.loaded === false) {
      throw new Error('run launcher.load before');
    }

    return cli;
  }
});

launcher.load = function load(opts) {
  return new Promise((resolve, reject) => {
    launcher.config = {
      get: key => {
        return opts[key];
      }
    };
    fs.readdir(__dirname, (err, files) => {
      files.forEach(file => {
        if (!/\.js$/.test(file) || file === 'launcher.js') {
          return;
        }

        const cmd = file.match(/(.*)\.js$/)[1];

        const mod = require('./' + file);

        if (mod.cli) {
          cli[cmd] = mod.cli;
        }

        if (mod.api) {
          api[cmd] = mod.api;
        }
      });
      launcher.loaded = true;
      resolve(launcher);
    });
  });
};

module.exports = launcher;