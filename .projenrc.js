const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'ODF Data',
  authorAddress: 'it@odfdata.com',
  cdkVersion: '2.54.0',
  defaultReleaseBranch: 'master',
  name: '@odfdata/blockchain-listener',
  repositoryUrl: 'git@github.com:odfdata/blockchain-listener.git',
  releaseToNpm: true,
  packageName: '@odfdata/blockchain-listener',
  description: 'The AWS Constructor to create a Blockchain Listener using AWS Fargate and Event Bridge',
  stability: 'experimental',
  gitignore: ['.idea'],
});
project.synth();
