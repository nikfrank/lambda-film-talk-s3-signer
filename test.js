const uploadSigner = require('./');

uploadSigner.handler({
  filename: 'six.mp4'
}, {
  fail: err => console.error(err),
  succeed: url=> console.log('success!', url),
});
