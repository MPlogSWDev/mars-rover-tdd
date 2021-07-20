/*
  DON'T EDIT THIS FILE
  Click Run to run the tests.
  Add new tests and .js files.
*/
let Jasmine = require('jasmine');
let jasmine = new Jasmine();

jasmine.loadConfig({
  spec_dir: 'spec',
  spec_files: [
    "**/*[sS]pec.js"
  ],
});

jasmine.execute();
