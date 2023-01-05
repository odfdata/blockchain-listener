const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Federico Castelli',
  authorAddress: 'fc@oracleofde.fi',
  cdkVersion: '2.54.0',
  defaultReleaseBranch: 'master',
  name: 'blockchain-listener',
  repositoryUrl: 'git@github.com:odfdata/blockchain-listener.git',
  releaseToNpm: true,
  packageName: 'blockchain-listener',
  description: 'The AWS Constructor to create a Blockchain Listener using AWS Fargate and Event Bridge',
  stability: 'experimental'
});
project.synth();
