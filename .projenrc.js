const { awscdk } = require('projen');
const { Stability } = require('projen/lib/cdk');
const { NpmAccess } = require('projen/lib/javascript');

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'ODF Data',
  authorUrl: 'https://odfdata.com',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  cdkVersion: '2.54.0',
  defaultReleaseBranch: 'master',
  name: '@odfdata/blockchain-listener',
  repositoryUrl: 'https://github.com/odfdata/blockchain-listener.git',
  authorOrganization: true,
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,
  description: 'The AWS Constructor to create a Blockchain Listener using AWS Fargate and Event Bridge',
  stability: Stability.STABLE,
  gitignore: ['.idea/'],
  majorVersion: 1,
  keywords: [
    'aws',
    'aws-cdk',
    'awscdk',
    'blockchain',
    'cdk',
    'blockchain-listener',
    'aws-ecs',
    'aws-event-bridge',
  ],
  depsUpgrade: false,
});
project.synth();
