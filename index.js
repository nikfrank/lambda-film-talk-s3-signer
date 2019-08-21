const AWS = require('aws-sdk');

let TO_BUCKET;

if( process.env.MODE === 'LOCAL' ){
  const credentials = new AWS.SharedIniFileCredentials({
    profile: 'default'
  });
  AWS.config.credentials = credentials;
  AWS.config.region = 'us-west-2';
  
  const localConfig = require('./config-local.json');
  TO_BUCKET = localConfig.TO_BUCKET;
} else {
  const lambdaConfig = require('./config-lambda.json');
  TO_BUCKET = lambdaConfig.TO_BUCKET;
}

const s3 = new AWS.S3();

exports.handler = (event, context) => {
  let filename;
  
  if(event.isBase64Encoded) {
    let buff = new Buffer(event.body, 'base64');
    filename = JSON.parse(buff.toString('ascii')).filename;
  } else {
    filename = JSON.parse(event.body).filename;
  }
  
  s3.getSignedUrl('putObject', {
    Bucket: TO_BUCKET,
    Key: filename,
    ContentType: 'multipart/form-data',
    Expires: 300
  }, (err, url)=>
    (err)? context.fail(err): context.succeed(url)
  );
}
