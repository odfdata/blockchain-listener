# Blockchain Listener on Amazon

This repository offers a CDK construct for deploying a Blockchain Listener using ECS Fargate. The ECS Task Definition 
is configured with a Docker image built locally, and thus requires the Docker daemon to be running. 
The Task Definition is equipped with the minimum available resources of .25 vCPU and .5 GB of RAM and is 
pre-configured with the necessary permissions to send events to the Custom Event Bus within Event Bridge. 
An ECS service is also established to keep a single task running at all times.

## Installation

Note that this construct requires [AWS CDK v2](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_install).

#### Typescript

```bash
yarn add @odfdata/blockchain-listener
```

## Deployments

The Blockchain Listener automatically builds and deploys your custom Docker image and sets the environment variable 
named BLOCKCHAIN_LISTENER_EVENT_BRIDGE_BUS_ARN to the ARN of the custom event bridge bus created by the construct.

```typescript
import path from 'path';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BlockchainListener } from '@odfdata/blockchain-listener';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    new BlockchainListener(
      this,
      'BlockchainListener',
      {
        cpuArchitecture: ecs.CpuArchitecture.ARM64 | ecs.CpuArchitecture.X86_64,
        cidrBlock: '10.0.0.0/24',
        containerImageDirectory: path.join(__dirname, '{directory_path_of_your_dockerfile}'),
      }
    );
  }
}
```

> ``📝`` When you instantiate a stack in your CDK Application, make sure to include the correct environment 
configuration for CDK to compile correctly. For example, if you want to specialize the stack for the AWS Account 
and Region that are implied by the current CLI configuration, use this line of code:  
`env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },`

See the [API Documentation](API.md) for details on all available input and output parameters.

### Examples

The following example explains how to set environment variables in your docker image.

```typescript
blockchainListener.blockchainListenerContainer.addEnvironment('WEBSOCKET_URL', '{your_websocket_url}');
blockchainListener.blockchainListenerContainer.addEnvironment('NFT_CONTRACT_ADDRESS', '{your_nft_contract_address}');
blockchainListener.blockchainListenerContainer.addEnvironment('NFT_TRANSFER_TOPIC', '{your_nft_transfer_topic}');
```

The following example explains how to create your listener main using `alchemy-sdk` to subscribe to
NFT transfer logs and publish them in the custom event bus created by the blockchain listener.

```typescript
import { AlchemyWeb3, createAlchemyWeb3, Log } from '@alch/alchemy-web3';
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

const websocketUrl: string = process.env.WEBSOCKET_URL as string;
const nftContractAddress: string = process.env.NFT_CONTRACT_ADDRESS as string;
const nftTransferTopic: string = process.env.NFT_TRANSFER_TOPIC;

const eventBridgeClient = new EventBridgeClient({});
const eventBridgeBusArn: string = process.env.BLOCKCHAIN_LISTENER_EVENT_BRIDGE_BUS_ARN as string;

const listener = async () => {
  const web3: AlchemyWeb3 = createAlchemyWeb3(websocketUrl);
  web3.eth.subscribe('logs', {
    address: nftContractAddress,
    // @ts-ignore
    topics: [nftTransferTopic]
  })
    // @ts-ignore
    .on('data', (log: Log) => {
      new Promise(async (resolve, reject) => {
        const eventBridgeEvent = new PutEventsCommand({
          Entries: [
            {
              Detail: JSON.stringify({
                eventName: 'NEW_MINT',
                log: log,
              }),
              EventBusName: eventBridgeBusArn,
              DetailType: 'newMint',
              Source: 'io.blockchain-listener',
            },
          ],
        });
        await eventBridgeClient.send(eventBridgeEvent).then();
      }).then(() => {});
    });
}


```

The following example explains how to subscribe your lambda function to listen to the
events published in the custom event bus.

```typescript

// create a new rule to subscribe newMintFunction to the blockchain listener event bus
new events.Rule(
  this,
  'EventRuleNewMint',
  {
    eventBus: blockchainListener.eventBus,
    enabled: true,
    description: 'The event rule responsible of filtering Blockchain Listener events published in the Event Bus ' +
      'and start the correct AWS Lambda Function',
    eventPattern: {
      source: ['io.blockchain-listener'],
      detail: {
        eventName: ['NEW_MINT'],
      },
    },
    targets: [
      new events_targets.LambdaFunction(newMintLamdaFunction),
    ],
  },
);
```

## Authors

*  Federico Castelli (fc@odfdata.com)
*  Antonio Seveso (as@odfdata.com)

## License

This project is licensed under the MIT-0 License. See the [LICENSE](LICENSE) file for details.
