import execa from 'execa';

async function installDepedencies(options) {
    const result = await execa('npm', ['install  redux redux-devtools-extension redux-saga react-redux'], {
        cwd: path.resolve(process.cwd())
    });
    if (result.failed) {
        return Promise.reject(new Error('Failed to install dependencies'));
    }
    return;
}

exports.cli = installDepedencies
exports.api = installDepedencies