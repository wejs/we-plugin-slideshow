const projectPath = process.cwd(),
  deleteDir = require('rimraf'),
  testTools = require('we-test-tools'),
  path = require('path');

let we;

before(function(callback) {
  this.slow(100);

  testTools.copyLocalConfigIfNotExitst(projectPath, function() {
    const We = require('we-core');
    we = new We();

    testTools.init({}, we);

    we.bootstrap({
      i18n: {
        directory: path.join(__dirname, 'locales'),
        updateFiles: true
      }
    } , (err, we)=> {
      if (err) throw err;

      we.startServer( (err)=> {
        if (err) throw err;
        callback();
      });
    });
  });
});

//after all tests
after(function (callback) {
  we.exit(callback);
});

after(function () {
  const tempFolders = [
    projectPath + '/files/tmp',
    projectPath + '/files/config',
    projectPath + '/files/sqlite'
  ];

  we.utils.async.each(tempFolders, (folder, next)=> {
    deleteDir( folder, next);
  }, (err)=> {
    if (err) throw new Error(err);
    process.exit();
  })
});