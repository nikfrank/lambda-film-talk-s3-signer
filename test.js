const uploadSigner = require('./');

uploadSigner.handler({
  filename: 'package.json'
}, {
  fail: err => console.error(err),
  succeed: url=> console.log('success!', url),
});
