/**
 * Remove old files, copy front-end ones.
 */

import * as fs from 'fs-extra';
import Logger from 'jet-logger';

try {
    // Remove current build
    fs.removeSync('./dist/');
    fs.copySync('./src/static', './dist/static');
} catch (err) {
    Logger.Err(err);
}
