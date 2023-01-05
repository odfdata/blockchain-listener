const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Federico Castelli',
  authorAddress: 'fc@oracleofde.fi',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'blockchain-listener',
  repositoryUrl: 'git@github.com:odfdata/blockchain-listener.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();