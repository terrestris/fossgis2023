import {
  publish
} from 'gh-pages';

const srcDirectory = 'public';
const options = {
  branch: 'gh-pages',
  dest: '.',
  message: 'Auto-generated updates from main-branch'
};
const callback = () => {
  console.log('Done.');
};

publish(srcDirectory, options, callback);