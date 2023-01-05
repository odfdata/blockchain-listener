const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'ODF Data',
  authorUrl: 'https://odfdata.com',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  cdkVersion: '2.54.0',
  defaultReleaseBranch: 'master',
  name: '@odfdata/blockchain-listener',
  repositoryUrl: 'git@github.com:odfdata/blockchain-listener.git',
  authorOrganization: true,
  releaseToNpm: true,
  description: 'The AWS Constructor to create a Blockchain Listener using AWS Fargate and Event Bridge',
  stability: 'experimental',
  gitignore: ['.idea'],
});
project.synth();
