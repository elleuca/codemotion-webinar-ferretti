exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['no-angular.spec.js'],
  baseUrl: 'http://localhost:3456',

  onPrepare: function () {
    browser.ignoreSynchronization = true;
  }
};
