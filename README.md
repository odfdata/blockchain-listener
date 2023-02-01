# Blockchain Listener on Amazon

This repository contains a CDK construct to deploy a Blockchain Listener using ECS Fargate.
It automatically deploys an ECS Task Definition with the Docker image you specify, an ECS
service that keeps 1 ECS Task Definition always up and running and 1 Event Bridge Custom Event
Bus where you can send events to.

## Installation

Note that this construct requires [AWS CDK v2](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_install).

#### Typescript

```bash
yarn add @odfdata/blockchain-listener
```

## Usage




## Authors

*  Federico Castelli (fc@odfdata.com)
*  Antonio Seveso (as@odfdata.com)


## License

This project is licensed under the MIT-0 License. See the [LICENSE](LICENSE) file for details.
