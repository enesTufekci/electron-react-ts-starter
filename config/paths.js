const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

const RENDERER_DIR = path.join(appDirectory, 'src', 'renderer');
const RENDERER_ENTRY = path.join(RENDERER_DIR, 'index.tsx');
const MAIN_DIR = path.join(appDirectory, 'src', 'main');
const MAIN_ENTRY = path.join(MAIN_DIR, 'index.ts');

module.exports = {
  RENDERER_DIR,
  RENDERER_ENTRY,
  MAIN_DIR,
  MAIN_ENTRY,
  DIST: path.join(appDirectory, 'dist')
};
